window.onload = function(){
    // 获取用户信息
    (function(){
        document.getElementById("getUserBtn").onclick = function(){
            // 创建xhr对象
            const xhr = new XMLHttpRequest();
            // 状态发生变化时调用
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        console.log(xhr.responseText);
                        const resp = JSON.parse(xhr.responseText);
                        console.log(resp);
                    }
                }
            };
            // 请求方式和地址
            xhr.open("GET", "/user");
            // 发送请求
            xhr.send();
        };
    })();


    // 登录
    (function(){
        document.getElementById("loginBtn").onclick = function(event){
            event.preventDefault();
            const name = document.getElementById("name").value;
            const password = document.getElementById("password").value;
            // 创建xhr对象
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        const resp = JSON.parse(xhr.responseText);
                        if(resp.code === 0){
                            alert("登录成功");
                        }else{
                            alert(resp.errorMsg);
                        }
                    }
                }
            };
            // 设置请求方式
            xhr.open("POST", "/login");
            // 设置请求头
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            // 发送请求体
            xhr.send(`name=${name}&password=${password}`);
        };
    })();

    // 注册
    (function(){
        document.getElementById("registerBtn").onclick = function(event){
            event.preventDefault();

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const age = document.getElementById("age").value;

            // 创建xhr
            const xhr = new XMLHttpRequest();

            // 设置请求类型，地址
            xhr.open("POST", "/register");
            // 设置请求头
            xhr.setRequestHeader("content-type", "application/json");
            // 发送请求体
            xhr.send(JSON.stringify({username, email, age}));
        };
    })();


    // 添加新闻
    (function(){
        document.getElementById("addNewsForm").onsubmit = function(event){
            event.preventDefault();
            const formdata = new FormData(this);
            // 创建xhr
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState === 4 && xhr.status === 200){
                    const resp = JSON.parse(xhr.responseText);
                    console.log(resp);
                }
            };
            xhr.upload.onprogress = (event)=>{
                const { loaded, total } = event;
                console.log(loaded/total * 100 + "%");
            };
            // 设置请求地址
            xhr.open(this.method, this.action);
            // 发送请求体
            xhr.send(formdata);
        }
    })();

    // 上传
    (function(){
        // 创建xhr对象
        const xhr = new XMLHttpRequest();

        const $percent = document.getElementById("percent");
        // 上传
        document.getElementById("uploadForm").onsubmit = function(event){
            event.preventDefault();

            // 获取formData
            const formData = new FormData(this);

            // 监测上传进度
            xhr.upload.onprogress = ({loaded, total})=>{
                  const percent = ((loaded / total) * 100).toFixed(2);
                  console.log(percent);
                  $percent.innerHTML = `当前上传了${percent}%`;
            };
            // 上传完成
            xhr.upload.onload = () => {
                  console.log("上传完毕！");
                  $percent.innerHTML = "上传成功！";
            };

            xhr.onreadystatechange = ()=>{
                if(xhr.readyState === 4 && xhr.status === 200){
                    const resp = JSON.parse(xhr.responseText);
                    console.log(resp);
                }
            };

            // 设置请求方式和地址
            xhr.open(this.method, this.action);

            // 发送信息
            xhr.send(formData);
        };

        // 中止上传
        document.getElementById("stop").onclick = function(){
            xhr.abort();
        };
    })();
};