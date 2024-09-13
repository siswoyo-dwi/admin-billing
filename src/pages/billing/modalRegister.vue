<template>
  <div class="">
    <Button 
      icon="pi pi-plus"
      class="mb-3"
      size="small"
      @click="visible = true"
      v-tooltip.left="`Register Billing`"
    />
    <Dialog v-model:visible="visible" :modal="true" class="p-fluid" header="Add" :breakpoints="{ '960px': '80vw' }" :style="{ width: '50vw' }" @hide="visible = false">
      <div class="" style="">
        <div class="flex flex-column gap-2">
          <label for="paket_id">Paket</label>
          <Dropdown id="inventoryStatus"    v-model="dataForm.paket"  :options="list_paket" optionLabel="label" placeholder="Pilih paket" 
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
  props: [ 'data','list_paket' ],
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
      dataForm: {paket:null},
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
        paket: { required },
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
        paket: null,
      }
    },
    async submit(){
      const vm = this
      vm.afterSubmit = true
      vm.dataForm.post={}
      vm.dataForm.post.paket_id = vm.dataForm.paket.paket_id
      vm.dataForm.post.unit_id = this.data.unit_id
      vm.dataForm.post.user_id = this.$store.state.login.id
      vm.dataForm.post.mulai = vm.$moment().format()
      vm.dataForm.post.harga_paket = vm.dataForm.paket.harga_paket
      vm.dataForm.post.status = 1
      const res = await vm.$axios.post('pendapatan/register', vm.dataForm.post)
      console.log(res);      

      if(res.data.status == 200){
        vm.visible = false
        vm.$emit('refresh')
        vm.$toast.add({ severity: 'success', summary: 'Konfirmasi', detail: 'Berhasil Register billing', life: 3000 });
      }else{
        vm.$toast.add({ severity: 'error', summary: 'Konfirmasi', detail: 'Gagal Register billing', life: 3000 });
      }
    },
  },
};
</script>