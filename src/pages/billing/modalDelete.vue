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
        const res = await vm.$axios.post('pendapatan/update',{status:3,pendapatan_id:vm.data.pendapatan_id})
        if(res.data.status == 200){
          vm.visible = false
          vm.$emit('refresh')
          vm.$toast.add({ severity: 'success', summary: 'Konfirmasi', detail: 'Berhasil Delete ps', life: 3000 });
        }else{
          vm.$toast.add({ severity: 'error', summary: 'Konfirmasi', detail: 'Gagal Delete ps', life: 3000 });
        }
      }
      });
    }
  },
};
</script>