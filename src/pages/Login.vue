<template>
      <div class="login-body surface-0 overflow-hidden " style="min-height: 100vh;">

    <!-- <div class="login-body"> -->
        <div class="login-image">
            <img :src="'layout/images/pages/login-'+ loginColor + '.png'" alt="atlantis">
        </div>
        <div class="login-panel p-fluid">
            <div class="flex flex-column">
                <div class="flex align-items-center mb-6 logo-container">
                    <img :src="'layout/images/logo-'+ color + '.png'" class="login-logo"/>
                    <img :src="'layout/images/appname-'+ color + '.png'" class="login-appname"/>
                </div>
                <div class="form-container">
                    <span class="p-input-icon-left">
                        <i class="pi pi-user pi-fw"></i>
                        <InputText v-model="data.username" type="text" placeholder="username" />
                    </span>
                    <span class="p-input-icon-left">
                        <i class="pi pi-key"></i>
                        <InputText v-model="data.password" type="password" placeholder="Password" />
                    </span>
                    <a href="#" class="flex">Forgot your password?</a>
                </div>
                <div class="button-container">
                    <router-link to="/">
                        <Button type="button" @click="login" label="Login"></Button>
                    </router-link>
                    <span>Don’t have an account?<a>Sign-up here</a></span>
                </div>
            </div>

            <!-- <div class="login-footer flex align-items-center">
                <div class="flex align-items-center login-footer-logo-container">
                    <img src="layout/images/logo-gray.png" class="login-footer-logo"/>
                    <img src="layout/images/appname-gray.png" class="login-footer-appname"/>
                </div>
                <span>Copyright 2021</span>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
		return {
            data: {
            username: null,
            password: null,
      },
		}
	},
    computed: {
        loginColor() {
            if (this.$appState.colorScheme === 'light') return 'ondark';
            return 'onlight';
        },
        color() {
            if (this.$appState.colorScheme === 'light') return 'dark';
            return 'light';
        }
    },
    methods:{
        async login(){
        const vm = this        
        const res = await vm.$axios.post('users/login', vm.data)
        if(res.data && res.data.length){
            vm.$store.commit("login", res.data[0])
            vm.$router.push('/dashboard')
            vm.$toast.add({ severity: 'success', summary: 'Konfirmasi', detail: 'Berhasil Login', life: 3000 });
        }else{
            vm.$toast.add({ severity: 'error', summary: 'Konfirmasi', detail: res.data.message, life: 3000 });
        }
        }
    }
}
</script>