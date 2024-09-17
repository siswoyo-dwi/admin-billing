<template>
  <div class="">
    <Button 
      label="Add"
      class="mb-3"
      size="small"
      @click="visible = true"
      v-tooltip.left="`Register`"
    />
    <Dialog v-model:visible="visible" :modal="true" class="p-fluid" header="Add" :breakpoints="{ '960px': '80vw' }" :style="{ width: '50vw' }" @hide="visible = false">
      <div class="flex flex-column gap-2">
        <label for="jajan_id">jajan</label>
        <Dropdown id="inventoryStatus"    v-model="dataForm.jajan_id"  :options="list_jajan" optionLabel="nama_jajan"             placeholder="Pilih jajan" 
        class="w-full"    :class="{'p-invalid': v$.dataForm.$invalid && afterSubmit}"/>
      </div>
      <div class="" style="">
        <div class="flex flex-column gap-2">
          <label for="atas_nama">Atas Nama</label>
          <InputText id="atas_nama" v-model="dataForm.atas_nama" aria-describedby="atas_nama-help" :class="{'p-invalid': v$.dataForm.atas_nama.$invalid}"/>
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
        no_nota: null,
        atas_nama:null,
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
        no_nota: { required },
        atas_nama: { required },
      }
    }
  },
  mounted() {
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
        atas_nama:null,
        no_nota: null,
      }
    },
    async submit(){
      const vm = this
      const res = await vm.$axios.post('nota/register', vm.dataForm)
      if(res.data.status == 200){
        vm.visible = false
        vm.$emit('refresh')
        vm.$toast.add({ severity: 'success', summary: 'Konfirmasi', detail: 'Berhasil Register jajan', life: 3000 });
      }else{
        vm.$toast.add({ severity: 'error', summary: 'Konfirmasi', detail: 'Gagal Register jajan', life: 3000 });
      }
    },
  },
};
</script>