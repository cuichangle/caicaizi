<template>
    <div>
是是是
    </div>
</template>
<script>
import app from '@/util/api'
export default {
    
    data(){
        return{

        }
    },
    methods:{

    },
    mounted(){
        app.request('getproduct',{}).then(res=>{
            console.log(res)
        })
    }
}
</script>
<style scoped>
    
</style>