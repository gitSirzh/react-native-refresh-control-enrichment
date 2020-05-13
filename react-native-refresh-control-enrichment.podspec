require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-refresh-control-enrichment"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-refresh-control-enrichment
                   DESC
  s.homepage     = "https://github.com/gitSirzh/react-native-refresh-control-enrichment"
  # brief license entry:
  s.license      = "MIT"
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "jszh" => "969883825@qq.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/gitSirzh/react-native-refresh-control-enrichment.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true

  s.dependency "React"
  # ...
  # s.dependency "..."
end

