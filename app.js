$(function () {
    document.activeElement.addEventListener('keydown', handleKeydown);
    function handleKeydown(e) {
        switch(e.key) {
          case 'ArrowUp':
            nav(-1);
            break;
          case 'ArrowDown':
            nav(1);
            break;
        }
    }
    function nav (move) {
        const currentIndex = document.activeElement.tabIndex;
        const next = currentIndex + move;
        const items = document.querySelectorAll('.items');
        const targetElement = items[next];
        targetElement.focus();
    }
    $("#install").click(function () {
        Wallace.extractAppAsset("kaiss.sorasky.in", "binary/resolv.conf", "/system/etc/resolv.conf", function () {
            Wallace.extractAppAsset("kaiss.sorasky.in", "binary/ss-local.bin", "/system/bin/ss-local", function () {
                Wallace.extractAppAsset("kaiss.sorasky.in", "binary/privoxy.bin", "/system/bin/privoxy", function () {
                    Wallace.extractAppAsset("kaiss.sorasky.in", "binary/privoxy.cfg", "/system/etc/privoxy.cfg", function () {
                        Wallace.runCmd("chmod 755 /system/bin/ss-local",function(){
                            Wallace.runCmd("chmod 755 /system/bin/privoxy", function () {
                                Wallace.runCmd("chmod 755 /system/etc/privoxy.cfg", function () {
                                    window.alert("安装完成！");
                                }, function () {
                                    window.alert("安装失败！");
                                });
                            }, function () {
                                window.alert("安装失败！");
                            });
                        }, function () {
                            window.alert("安装失败！");
                        });
                    }, function () {
                        window.alert("安装失败！");
                    });
                }, function () {
                    window.alert("安装失败！");
                });
            }, function () {
                window.alert("安装失败！");
            });
        }, function () {
            window.alert("安装失败！");
        });
    });
    $("#start").click(function () {
        var host = prompt("请输入服务器地址：",localStorage.getItem("host"));
        var port = prompt("请输入端口：",localStorage.getItem("port"));
        var pwd = prompt("请输入密码：",localStorage.getItem("pws"));
        var method = prompt("请输入加密方式：",localStorage.getItem("method"));
        if (host && port && pwd && method) {
            localStorage.setItem("host", host);
            localStorage.setItem("port", port);
            localStorage.setItem("pwd", pwd);
            localStorage.setItem("method", method);
            Wallace.runCmd("privoxy /system/etc/privoxy.cfg", function () {
                Wallace.runCmd('nohup ss-local -s ' + host + ' -p ' + port + ' -l 1080 -k "' + pwd + '" -m ' + method + ' -v', function () {
                    Wallace.setSystemSetting("browser.proxy.host", "127.0.0.1", function () {
                        Wallace.setSystemSetting("browser.proxy.port", "1081", function () {
                            Wallace.setSystemSetting('browser.proxy.enabled', true, function () {
                                window.alert("启动成功！");
                            }, function (e) {
                                window.alert("启动失败！" + e);
                            });
                        }, function (e) {
                            window.alert("系统代理端口设置出错！" + e);
                        });
                    }, function () {
                        window.alert("系统代理服务器设置出错：" + e);
                    });
                }, function () {
                    window.alert('启动失败！' + this.error.name);
                });
            }, function () {
                window.alert('启动失败！' + this.error.name);
            });
        } else {
            window.alert("输入值不可为空！");
        }
    });
    $("#stop").click(function () {
        Wallace.runCmd("pkill privoxy", function () {
            Wallace.runCmd("pkill ss-local", function () {
                Wallace.setSystemSetting('browser.proxy.enabled', false, function () {
                    window.alert("停止成功！");
                }, function () {
                    window.alert("停止失败！");
                });
            }, function () {
                window.alert("停止失败！");
            });
        }, function () {
            window.alert("停止失败！");
        });
    });
});