<template>
  <div class="">
    <Button 
      label=""
      class=""
      severity="danger"
      size="small"
      icon="pi pi-trash"
      @click="visible = true"
      v-tooltip.left="`Delete`"
    />
    <Dialog v-model:visible="visible" :modal="true" class="p-fluid" header="Delete" :style="{ width: '50vw' }" @hide="visible = false">
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