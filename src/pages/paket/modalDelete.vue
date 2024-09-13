<template>
  <div class="">
    <Button 
      label=""
      class=""
      severity="danger"
      size="small"
      icon="pi pi-trash"
      @click="submit()"
      v-tooltip.left="`Delete`"
    />
  </div>
</template>

<script>
export default {
  components: {
  },
  props: [ 'data' ],
  emits: [ 'refresh' ],
  data() {
    return {
    };
  },
  methods: {
    submit(){
      const vm = this
      vm.$confirm.require({
      message: 'Apakah anda yakin ingin menghapus data ini ?',
      header: 'Konfirmasi',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'hapus',
      accept: async () => {
        console.log(vm.data);
        
        const res = await vm.$axios.post('paket/delete', vm.data)
        if(res.data.status == 200){
          vm.visible = false
          vm.$emit('refresh')
          vm.$toast.add({ severity: 'success', summary: 'Konfirmasi', detail: 'Berhasil Delete Paket', life: 3000 });
        }else{
          vm.$toast.add({ severity: 'error', summary: 'Konfirmasi', detail: 'Gagal Delete Paket', life: 3000 });
        }
      }
      });
    }
  },
};
</script>