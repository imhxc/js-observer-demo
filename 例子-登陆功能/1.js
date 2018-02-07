// 缓存相关dom
let loginBtn = $('loginBtn'),
    oHeader = $('header'),
    oNav = $('nav'),
    oShopCart = $('shopCart'),
    oNews = $('news'),
    addNavListen = $('addNavListen'),
    addshopCartListen = $('addshopCartListen'),
    addNewsListen = $('addNewsListen');

let events = {
    clientList: [],
    listen: function(key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn);
    },
    trigger: function() {
        let key = Array.prototype.shift.call(arguments);
        let fns = this.clientList[key];
        if (!fns || fns.length === 0) { // 没有绑定该类消息
            return false;
        }
        fns.forEach(ele => {
            ele.apply(this, arguments);
        })
    },
    remove: function(key, fn) {
        var fns = thsi.clientList[key];
        if (!fns) { // 没有该key对应的订阅事件
            return false;
        }
        if (!fn) { // 如果没有传递fn，则说明删除所有
            fns && (fns.length = 0);
        } else {
            for(let i = fns.length - 1; i >= 0; i--) {
                let _fn = fns[i];
                if (_fn === fn) {
                    fns.splice(i, 1);
                }
            }
        }
    }
}

// 定义一个通用方法 给对象添加发布-订阅事件
let installEvent = function(obj) {
    for(let i in events) {
        obj[i] = events[i]
    }
}

// 定义login 对象 ，安装发布--订阅事件
let login = {};
installEvent(login);

loginBtn.addEventListener('click', function() {
    // 这里其实也是一个dom的发布订阅模式
    let obj = {
        msg: '登陆成功',
        name: '小红红',
        avatar: 'http://img.zcool.cn/community/01ddf15a7968cba801213466828f0a.jpeg@520w_390h_1c_1e_1o_100sh.jpg',
        shopcount: 20,
        newscount: 18
    }
    this.style.display = 'none';
    alert('登陆成功, 信息发布成功');
    $('sectionwrap').style.display = 'none';
    login.trigger('success', obj)
});




// 各个模块监听事件
// header模块监听
let header = (function(){
    login.listen('success', function(data) {
        header.show(data.avatar);
    });
    return {
        show: function(avatar) {
            oHeader.style.backgroundColor = '#ffc900';
            oHeader.style.color = '#333';
            oHeader.innerHTML += `<p>头像:<img src='${avatar}' width=20 height=20/></p>`;
        }
    }
})();





/*
 *  模拟业务
 *  当模块需要订阅登陆事件
 */
// nav模块监听
let nav;
// shop cart 监听
let shopCart;
// shop cart 监听
let news;
addNavListen.addEventListener('click', function(){
    this.style.display = 'none';
    alert('订阅成功');
    nav = (function() {
        login.listen('success', function(data) {
            nav.show(data.name);
        });
        return {
            show: function(name) {
                setStyle(oNav, `<p>姓名: ${name}`);
            }
        }
    })()
});
addshopCartListen.addEventListener('click', function(e){
    this.style.display = 'none';
    alert('订阅成功');
    shopCart = (function() {
        login.listen('success', function(data) {
            shopCart.show(data.shopcount);
        });
        return {
            show: function(count) {
                setStyle(oShopCart, `<p>未读消息: ${count}`)
            }
        }
    })();
});
addNewsListen.addEventListener('click', function(e){
    this.style.display = 'none';
    alert('订阅成功');
    news = (function() {
        login.listen('success', function(data) {
            news.show(data.newscount);
        });
        return {
            show: function(count) {
                setStyle(oNews, `<p>未读消息: ${count}`)
            }
        }
    })();
});



/* 
 * 定义一些懒人方法
 */

function $(id) {
    return document.getElementById(id);
}
function setStyle(ele ,str) {
    ele.style.backgroundColor = '#ffc900';
    ele.style.color = '#333';
    ele.innerHTML += str;
}