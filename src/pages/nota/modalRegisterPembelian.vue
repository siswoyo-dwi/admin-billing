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
        <Dropdown id="inventoryStatus"    v-model="dataForm.jajan_id"  :options="list_jajan" optionLabel="nama_jajan"    optionValue="jajan_id"           placeholder="Pilih jajan" 
        class="w-full"    :class="{'p-invalid': v$.dataForm.$invalid && afterSubmit}"/>
      </div>
      <div class="" style="">
        <div class="flex flex-column gap-2">
          <label for="jumlah_jajan">Jumlah</label>
          <InputText id="jumlah_jajan" v-model="dataForm.jumlah_jajan" aria-describedby="jumlah_jajan-help" :class="{'p-invalid': v$.dataForm.jumlah_jajan.$invalid}"/>
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
  props:['data','list_jajan'],
  emits: [ 'refresh' ],
  components: {
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      visible: false,
      jajan:{},
      dataForm: {
        jajan_id: null,
        jumlah_jajan:null,
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
        jajan_id: { required },
        jumlah_jajan: { required },
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
        jumlah_jajan:null,
        jajan_id: null,
      }
    },
    async submit(){
      const vm = this
      vm.dataForm.nota_id = vm.data.nota_id
      const res = await vm.$axios.post('penjualan_jajan/register', vm.dataForm)
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