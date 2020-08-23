# KaiSS - 适用于KaiOS设备的ShadowSocks客户端

> 作者：Sora

> 博客：https://www.sorasky.in

> 项目博客页面：https://www.sorasky.in/kaiss.sorasky

## 1.KaiSS是什么？

KaiSS是适用于KaiOS设备的第三方ShadowSocks客户端，目前为0.1版本，只有最基础的安装配置服务、启动服务、停止服务三种功能<del>（甚至连配置数据保存功能都没有啊蛤蛤蛤）</del>，但我后续可能会完善的！欢迎发issue和贡献代码！（发完issue希望能在博客吱一声，我能看见）

## 2.KaiSS怎么用？

1.使用OmniSD/WebIDE/GerdaPkg将KaiSS安装至您的kaiOS设备上；

2.使用Wallace/Wallace Toolbox等应用root您的设备；

3.启动KaiSS，安装服务；

4.点击启动服务，输入服务器地址、服务器端口、密码、加密模式（小写、使用横杠“-”而不是下划线“_”）

5.由于是测试版，如果没有成功启用，请使用Wallace Toolbox设置代理服务器为127.0.0.1，端口1081，并启用代理；

6.如需停止服务，可直接在Wallace Toolbox中停止，也可在KaiSS界面内停止，如果没有成功禁用代理（浏览器报错“无法连接代理服务器”）可再使用Wallace Toolbox停止。