<template>
  <div class="grid card d-flex flex-column h-100">
    <!-- Header -->
    <div class="grid-header d-flex flex-wrap m-2 mb-0">
      <div class="input-group input-group-sm">
        <span class="input-group-text">Nutrition</span>
      </div>
      <div class="input-group input-group-sm flex-shrink-1">
        <button class="btn btn-primary"><i class="fas fa-plus"></i></button>
        <button class="btn btn-secondary"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger"><i class="fas fa-trash"></i></button>
      </div>
      <div class="flex-grow-1 grid-search-input d-flex flex-wrap">
        <div class="input-group input-group-sm flex-grow-1">
          <span class="input-group-text"><i class="fas fa-search"></i></span>
          <input type="text" class="form-control" placeholder="Search" aria-label="Search" v-model="search" />
        </div>
        <div class="input-group input-group-sm flex-grow-1">
          <span class="input-group-text"><i class="fas fa-layer-group"></i></span>
          <select class="form-select" aria-label="Group by" v-model="groupByKey">
            <option value="">Group by</option>
            <option v-for="(header, index) of headers" :key="index" :value="header.key">{{ header.title }}</option>
          </select>
        </div>
      </div>
    </div>
    <!-- Body -->
    <div class="grid-body card flex-grow-1 m-2">
      <v-data-table
        :key="groupByKey"
        density="compact"
        :headers="headers"
        :items="desserts"
        item-key="name"
        v-model="selectedRows"
        :show-select="false"
        multi-sort
        :search="search"
        :sort-by="sortBy"
        :group-by="groupBy"
      >
        <template v-slot:item="{ item }">
          <tr class :class="selectedRows.indexOf(item.value) > -1 ? 'selected' : ''" @click="rowClicked(item.value)">
            <!-- <td @click.stop="rowClicked(item.value)">
              <input type="checkbox" :checked="selectedRows.indexOf(item.value) > -1" />
            </td> -->
            <td>{{ item.columns.name }}</td>
            <td>{{ item.columns.calories }}</td>
            <td>{{ item.columns.fat }}</td>
            <td>{{ item.columns.carbs }}</td>
            <td>{{ item.columns.protein }}</td>
            <td>{{ item.columns.iron }}</td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      selectedRows: ["s"],
      search: "",
      sortBy: [],
      groupByKey: "",
      headers: [
        {
          align: "start",
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
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22,
        },
        {
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
  computed: {
    groupBy() {
      if (this.headers.map((x) => x.key).includes(this.groupByKey)) {
        console.log([{ key: this.groupByKey }]);
        return [{ key: this.groupByKey }];
      } else {
        return [];
      }
    },
  },
  methods: {
    rowClicked(item: unknown) {
      console.log(this.selectedRows);
      console.log({ ...item });
      this.selectedRows = [item];
    },
  },
});
</script>

<style lang="scss" scoped>
.grid {
  user-select: none;
}
.grid-header {
  gap: 0.5em;
}
.grid-search-input {
  gap: 0.5em;
}
:deep(.grid-body) {
  min-height: 10em;

  // header
  thead {
    th {
      font-weight: bold !important;
    }
    i {
      margin-left: 0.3em;
    }
  }

  // footer fix
  .v-table {
    display: flex;
    flex-direction: column;
    height: 100%;

    .v-table__wrapper {
      flex-grow: 1;
    }
  }

  // borders
  th,
  td {
    border: 1px solid #383838;
  }

  // smaller elements
  * {
    font-size: 14px;
  }
  .v-data-table-header__sort-badge {
    font-size: 10px;
  }

  .v-field {
    height: 35px;
  }

  // selection
  td {
    background-color: red;
  }
  tr {
    cursor: pointer;
  }
  tr:hover {
    background-color: gray;
  }
}

.v-list-item {
  min-height: 35px;
}

.input-group {
  width: auto;
}
</style>
