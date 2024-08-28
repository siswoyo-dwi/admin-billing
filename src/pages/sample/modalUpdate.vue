<template>
  <div class="">
    <Button 
      label=""
      class=""
      severity="warning"
      size="small"
      icon="pi pi-pencil"
      @click="visible = true"
      v-tooltip.left="`Update`"
    />
    <Dialog v-model:visible="visible" :modal="true" class="p-fluid" header="Update" :breakpoints="{ '960px': '80vw' }" :style="{ width: '50vw' }" @hide="visible = false">
      <!-- <div class="" style="">
        
      </div> -->
      <template #footer>
      </template>
    </Dialog>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
  },
};
</script>