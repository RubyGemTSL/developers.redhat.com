class JenkinsTestRunner

  def initialize(host_to_test, control_script_location)
    @host_to_test = host_to_test
    @control_script_location = control_script_location
  end

  def run_tests
    tests_passed = true
    %w(desktop mobile kc_dm).each do |profile|
      tests_passed &= execute_test(profile)
    end
    tests_passed
  end

  def execute_test(profile)
    system("bundle exec ruby #{@control_script_location} -e drupal-dev --acceptance_test_target=#{@host_to_test} --acceptance_test_profile=#{profile}")
  end

  private :execute_test

end

def execute(jenkins_test_runner)
  tests_passed = jenkins_test_runner.run_tests
  Kernel.exit(tests_passed ? 0 : 1)
end

if $0 == __FILE__
  host_to_test = ARGV[0]
  jenkins_test_runner = JenkinsTestRunner.new(host_to_test, '../_docker/control.rb')
  execute(jenkins_test_runner)
end
