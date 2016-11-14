require 'report_builder'
require 'colorize'
require 'colorized_string'

class TestRunner

  def cleanup(profile)

    FileUtils.rm_rf("_cucumber/reports/#{profile}")
    FileUtils.mkdir_p("_cucumber/reports/#{profile}")

    FileUtils.rm_rf("_cucumber/screenshots/#{profile}")
    FileUtils.mkdir_p("_cucumber/screenshots/#{profile}")

    FileUtils.rm_rf("_cucumber/tmp/#{profile}")
    FileUtils.mkdir_p("_cucumber/tmp/#{profile}")

  end

  def run(profile, tag=nil)
    tag_string = tag unless tag.eql?(nil)
    if tag.eql?(nil)
      command = system "parallel_cucumber _cucumber/features/ -o \"-p #{profile}\" -n 10"
    else
      command = system("parallel_cucumber _cucumber/features/ -o \"-p #{profile} #{tag_string}\" -n 10")
    end
    rerun(profile) unless command == true
    $?.exitstatus
  end

  def set_ci_test_env_variables(profile)
    case profile
      when 'desktop'
        ENV['ACCEPTANCE_TEST_DESCRIPTION'] = 'Drupal:Desktop FE Acceptance Tests'
        ENV['RHD_JS_DRIVER'] = 'docker_chrome'
      when 'mobile'
        ENV['ACCEPTANCE_TEST_DESCRIPTION'] = 'Drupal:Mobile FE Acceptance Tests'
        ENV['RHD_JS_DRIVER'] = 'iphone_6'
      when 'kc_dm'
        ENV['ACCEPTANCE_TEST_DESCRIPTION'] = 'Drupal:Desktop FE KC/DM Acceptance Tests'
        ENV['RHD_JS_DRIVER'] = 'docker_chrome'
      else
        profiles = %w(desktop mobile kc_dm)
        raise("#{profile} is not a recognised cucumber profile, see cucumber.yml file in project root") unless profiles.include?(profile)
    end
  end

  def rerun(profile)
    puts ColorizedString.new('. . . . . There were failures during the test run! Attempt one of rerunning failed scenarios . . . . .').red
    command = system('bundle exec cucumber --profile rerun_failures')
    unless command == true
      puts ColorizedString.new('. . . . . There were failures during first rerun! Attempt two of rerunning failed scenarios . . . . .').red
      system("bundle exec cucumber @_cucumber/tmp/#{profile}/rerunner.txt")
    end
    $?.exitstatus
  end

  def initialize_report(profile)
    ReportBuilder.configure do |config|
      config.json_path = "_cucumber/reports/#{profile}"
      config.report_path = "_cucumber/reports/#{profile}/rhd_#{profile}_test_report"
      config.report_types = [:json, :html]
      config.report_tabs = [:overview, :features, :errors]
      config.report_title = "RHD #{profile.capitalize} Test Report"
      config.compress_images = true
    end
  end

  def generate_report
    ReportBuilder.build_report
  end

end
