<template>
  <div class="h-100">
    <ClientsideTable :headers="headers" :items="desserts" @row-clicked="rowClicked" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ClientsideTable from "@/components/table/ClientsideTable.vue";

export default defineComponent({
  components: { ClientsideTable },
  data() {
    return {
      headers: [
        {
          key: "name",
          title: "Dessert (100g serving)",
        },
        { key: "calories", title: "Calories" },
        { key: "fat", title: "Fat (g)" },
        { key: "carbs", title: "Carbs (g)" },
        { key: "protein", title: "Protein (g)" },
        { key: "iron", title: "Iron (%)" },
      ],
      desserts: [
        {
          id: 1,
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          id: 2,
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          id: 3,
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          id: 4,
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          id: 5,
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          id: 6,
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          id: 7,
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
        {
          id: 8,
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45,
        },
        {
          id: 9,
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22,
        },
        {
          id: 10,
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6,
        },
      ],
    };
  },
  methods: {
    rowClicked(item: unknown) {
      console.log({ ...item });
    },
  },
});
</script>

<style lang="scss" scoped></style>
