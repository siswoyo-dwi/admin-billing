<template>
  <div class="">
    <Button 
      label=""
      class=""
      size="small"
      severity="warning"
      icon="pi pi-pencil"
      @click="openModal()"
      v-tooltip.left="`Update jajan`"
    />
    <Dialog v-model:visible="visible" :modal="true" class="p-fluid" header="Update jajan" :breakpoints="{ '960px': '80vw' }" :style="{ width: '50vw' }" @hide="hideModal()">
      <div class="" style="">
        <div class="flex flex-column gap-2">
          <label for="nama_jajan">Nama jajan</label>
          <InputText id="nama_jajan" v-model="dataForm.nama_jajan" aria-describedby="nama_jajan-help" :class="{'p-invalid': v$.dataForm.nama_jajan.$invalid}"/>
        </div>
      </div>
      <div class="flex flex-column gap-2">
        <label for="harga_beli">Harga beli</label>
        <InputNumber id="harga_beli" integeronly v-model="dataForm.harga_beli" aria-describedby="harga_paket-help" :class="{'p-invalid': v$.dataForm.$invalid}"/>
      </div>
      <div class="flex flex-column gap-2">
        <label for="harga_jual">Harga jual</label>
        <InputNumber id="harga_jual" integeronly v-model="dataForm.harga_jual" aria-describedby="harga_paket-help" :class="{'p-invalid': v$.dataForm.$invalid}"/>
      </div>
      <template #footer>
        <div class="flex justify-content-end">
          <Button 
            label="Save"
            class=""
            size="small"
            :disabled="!isValid && !isDirty"
            v-tooltip.left="`save`"
            @click="submit()"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
export default {
  props: [ 'data' ],
  emits: [ 'refresh' ],
  components: {
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      visible: false,
      dataForm: {
        harga_beli:null,
        harga_jual:null,
        nama_jajan: null,
      },
    };
  },
  computed: {
    isValid() {
      return !this.v$.dataForm.$invalid;
    },
    isDirty() {
      return this.v$.dataForm.$anyDirty;
    },
  },
  validations () {
    return {
      dataForm: {
        nama_jajan:{ required },
        harga_beli:{ required },
        harga_jual:{ required },
      }
    }
  },
  mounted() {
  },
  methods: {
    openModal(){
      const vm = this
      vm.visible = true
      vm.dataForm = JSON.parse(JSON.stringify(vm.data))
      
      vm.v$.$reset();
    },
    hideModal(){
      const vm = this
      vm.visible = false
    },
    async submit(){
      const vm = this
      console.log('dataform', vm.dataForm)
      const res = await vm.$axios.post('jajan/update', vm.dataForm)
      if(res.data.status == 200){
        vm.visible = false
        vm.$emit('refresh')
        vm.$toast.add({ severity: 'success', summary: 'Konfirmasi', detail: 'Berhasil Update jajan', life: 3000 });
      }else{
        vm.$toast.add({ severity: 'error', summary: 'Konfirmasi', detail: 'Gagal Update jajan', life: 3000 });
      }
    },
  },
};
</script>