<template>
  <div class="">
    <Button 
      label="Add"
      class="mb-3"
      size="small"
      @click="visible = true"
      v-tooltip.left="`Add`"
    />
    <Dialog v-model:visible="visible" :modal="true" class="p-fluid" header="Add" :breakpoints="{ '960px': '80vw' }" :style="{ width: '50vw' }" @hide="visible = false">
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