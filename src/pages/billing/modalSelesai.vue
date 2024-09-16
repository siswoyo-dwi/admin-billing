<template>
  <div class="">
    <Button 
      label=""
      class=""
      severity="danger"
      size="small"
      icon="pi pi-ban"
      @click="submit()"
      v-tooltip.left="`Selesai`"
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
      message: 'Apakah anda yakin ingin menyelesaikan pembayaran ini ?',
      header: 'Konfirmasi',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Bayar',
      accept: async () => {
        console.log(vm.data);
        
        const res = await vm.$axios.post('pendapatan/update_status',{harga_paket:vm.data.kalkulasi_biaya,status:2,selesai:vm.data.nama_paket =='Reguler'?vm.$moment().format():vm.data.selesai,pendapatan_id:vm.data.pendapatan_id})
        if(res.data.status == 200){
          vm.visible = false
          vm.$emit('refresh')
          vm.$toast.add({ severity: 'success', summary: 'Konfirmasi', detail: 'Berhasil Menyelesaikan Pembayaran', life: 3000 });
        }else{
          vm.$toast.add({ severity: 'error', summary: 'Konfirmasi', detail: 'Gagal Menyelesaikan Pembayaran', life: 3000 });
        }
      }
      });
    }
  },
};
</script>