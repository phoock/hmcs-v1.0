class MUtil {
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success: res => {
                  if(0===res.status){
                    resolve(res.data, res.msg)
                  }else if(10 === res.statu){
                    //没有登录状态,强制登录
                    this.doLogin()
                  }else{
                    reject(res.msg || res.data)
                  }
                },
                error: err => {
                  reject(err.statusText)
                }
            })
        });

    }
    doLogin(){
      window.location.href = '/login?redirect=' + encodeURIComponent(window.loacation.pathname);
    }

}

export default MUtil;
