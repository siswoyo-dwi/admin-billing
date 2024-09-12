<template>
  <div class="">
    <Button 
      label="Add"
      class="mb-3"
      size="small"
      @click="visible = true"
      v-tooltip.left="`Register Paket`"
    />
    <Dialog v-model:visible="visible" :modal="true" class="p-fluid" header="Add" :breakpoints="{ '960px': '80vw' }" :style="{ width: '50vw' }" @hide="visible = false">
      <div class="" style="">
        <div class="flex flex-column gap-2">
          <label for="nama_paket">Nama Paket</label>
          <InputText id="nama_paket" v-model="dataForm.nama_paket" aria-describedby="nama_paket-help" :class="{'p-invalid': v$.dataForm.$invalid}"/>
        </div>
    
        <div class="flex flex-column gap-2">
          <label for="ps_id">Ps</label>
          <Dropdown id="inventoryStatus"    v-model="dataForm.ps_id"  :options="list_ps" optionLabel="label"             placeholder="Pilih Ps" 
          class="w-full"    :class="{'p-invalid': v$.dataForm.$invalid && afterSubmit}"/>

        </div>
        <div class="flex flex-column gap-2">
          <label for="time">Durasi Paket</label>
          <InputNumber id="time" integeronly v-model="dataForm.time" aria-describedby="time-help" :class="{'p-invalid': v$.dataForm.$invalid}"/>
        </div>
        <div class="flex flex-column gap-2">
          <label for="harga_paket">Harga Paket</label>
          <InputNumber id="harga_paket" integeronly v-model="dataForm.harga_paket" aria-describedby="harga_paket-help" :class="{'p-invalid': v$.dataForm.$invalid}"/>
        </div>
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
  props: [ 'list_ps' ],
  emits: [ 'refresh' ],
  components: {
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      visible: false,
      afterSubmit: false,
      dataForm: {
        nama_paket:null,
        ps_id:null,
        time:null,
        harga_paket:null,
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
        nama_paket: { required },
        ps_id: { required },
        time: { required },
        harga_paket: { required },
      }
    }
  },
  mounted() {
    console.log(this.list_ps);
    
  },
  methods: {
    openModal(){
      const vm = this
      vm.visible = true      
      vm.v$.$reset();
    },
    hideModal(){
      const vm = this
      vm.visible = false
      vm.dataForm = {
        nama_paket: null,
        ps_id:null,
        time:null,
        harga_paket:null,
      }
    },
    async submit(){
      const vm = this
      vm.afterSubmit = true
      console.log(vm.dataForm);
      vm.dataForm.ps_id = vm.dataForm.ps_id.value
      const res = await vm.$axios.post('paket/register', vm.dataForm)
      if(res.data.status == 200){
        vm.visible = false
        vm.$emit('refresh')
        vm.$toast.add({ severity: 'success', summary: 'Konfirmasi', detail: 'Berhasil Register paket ps', life: 3000 });
      }else{
        vm.$toast.add({ severity: 'error', summary: 'Konfirmasi', detail: 'Gagal Register paket ps', life: 3000 });
      }
    },
  },
};
</script>