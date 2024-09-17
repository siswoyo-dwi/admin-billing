<template>
  <div class="">
    <Button 
      label=""
      class=""
      size="small"
      severity="warning"
      icon="pi pi-pencil"
      @click="openModal()"
      v-tooltip.left="`Update nota`"
    />
    <Dialog v-model:visible="visible" :modal="true" class="p-fluid" header="Update nota" :breakpoints="{ '960px': '80vw' }" :style="{ width: '50vw' }" @hide="hideModal()">
      <div class="" style="">
        <div class="flex flex-column gap-2">
          <label for="no_nota">Nomor nota</label>
          <InputText id="no_nota" v-model="dataForm.no_nota" aria-describedby="no_nota-help" :class="{'p-invalid': v$.dataForm.no_nota.$invalid}"/>
        </div>
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
        atas_nama:{ required },
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
      const res = await vm.$axios.post('nota/update', vm.dataForm)
      if(res.data.status == 200){
        vm.visible = false
        vm.$emit('refresh')
        vm.$toast.add({ severity: 'success', summary: 'Konfirmasi', detail: 'Berhasil Update nota', life: 3000 });
      }else{
        vm.$toast.add({ severity: 'error', summary: 'Konfirmasi', detail: 'Gagal Update nota', life: 3000 });
      }
    },
  },
};
</script>