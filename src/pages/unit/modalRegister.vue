<template>
  <div class="">
    <Button 
      label="Add"
      class="mb-3"
      size="small"
      @click="visible = true"
      v-tooltip.left="`Register unit`"
    />
    <Dialog v-model:visible="visible" :modal="true" class="p-fluid" header="Add" :breakpoints="{ '960px': '80vw' }" :style="{ width: '50vw' }" @hide="visible = false">
      <div class="" style="">
        <div class="flex flex-column gap-2">
          <label for="nama_unit">Nama unit</label>
          <InputText id="nama_unit" v-model="dataForm.nama_unit" aria-describedby="nama_unit-help" :class="{'p-invalid': v$.dataForm.$invalid}"/>
        </div>
    
        <div class="flex flex-column gap-2">
          <label for="ps_id">Ps</label>
          <Dropdown id="inventoryStatus"    v-model="dataForm.ps_id"  :options="list_ps" optionLabel="label"             placeholder="Pilih Ps" 
          class="w-full"    :class="{'p-invalid': v$.dataForm.$invalid && afterSubmit}"/>
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
        nama_unit:null,
        ps_id:null,
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
        nama_unit: { required },
        ps_id: { required },
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
        nama_unit: null,
        ps_id:null,
      }
    },
    async submit(){
      const vm = this
      vm.afterSubmit = true
      console.log(vm.dataForm);
      vm.dataForm.ps_id = vm.dataForm.ps_id.value
      const res = await vm.$axios.post('unit/register', vm.dataForm)
      if(res.data.status == 200){
        vm.visible = false
        vm.$emit('refresh')
        vm.$toast.add({ severity: 'success', summary: 'Konfirmasi', detail: 'Berhasil Register unit ps', life: 3000 });
      }else{
        vm.$toast.add({ severity: 'error', summary: 'Konfirmasi', detail: 'Gagal Register unit ps', life: 3000 });
      }
    },
  },
};
</script>