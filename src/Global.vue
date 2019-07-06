<script>
    const baseURL='http://127.0.0.1:8082';
    const token='12345678';
    const hasEnter=false;
    const userSite="中国钓鱼岛";
    const nickname="超级管理员";
    export default
    {
        userSite:"",//用户地址
        token:"",//用户token身份
        baseURL:"http://127.0.0.1:8082",//服务器地址
        hasEnter:"",//用户登录状态
        nickname:"超级管理员",
        setToken(token){
            this.token = token;
        },
        setNickname(nickname){
            this.nickname = nickname;
        }
    }
</script>