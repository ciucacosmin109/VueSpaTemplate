<template>
  <div id="vuetify-grid" class="grid card d-flex flex-column h-100">
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
        :items="items"
        item-key="name"
        v-model="selectedRows"
        :show-select="showCheckboxes"
        multi-sort
        :search="search"
        :sort-by="sortBy"
        :group-by="groupBy"
      >
        <template v-slot:item="{ item }">
          <tr class :class="selectedRows.indexOf(item.value) > -1 ? 'selected' : ''" @click="rowClicked(item.value)">
            <td v-if="groupByKey"></td>
            <td v-if="showCheckboxes" @click.stop="rowClicked(item.value)">
              <input type="checkbox" :checked="selectedRows.indexOf(item.value) > -1" />
            </td>
            <td v-for="col in headers">{{ item.columns[col.key] }}</td>
          </tr>
        </template>

        <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
          <tr>
            <td :colspan="columns.length">
              <VBtn
                size="small"
                variant="text"
                :icon="isGroupOpen(item) ? '$expand' : '$next'"
                @click="toggleGroup(item)"
              ></VBtn>
              {{ item.value }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { VDataTable } from "vuetify/labs/VDataTable";
import { VBtn } from "vuetify/components";
import type { DataTableHeader, SortItem } from "./vuetifyTableTypes";

export default defineComponent({
  emits: ["rowClicked"],
  components: { VDataTable, VBtn },
  props: {
    headers: {
      type: Array as PropType<DataTableHeader[]>,
      required: true,
    },
    items: {
      type: Array as PropType<unknown[]>,
      required: true,
    },

    showCheckboxes: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedRows: [] as unknown[],
      search: "",
      sortBy: [] as SortItem[],
      groupByKey: "",
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
      this.selectedRows = [item];
      this.$emit("rowClicked", item);
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
  tr {
    cursor: pointer;
  }
  tr:hover {
    --v-theme-surface: darkgray;
    background-color: darkgray;
  }

  tr.selected {
    --v-theme-surface: --bs-nav-pills-link-active-bg;
    background-color: var(--bs-nav-pills-link-active-bg);
  }
}

.v-list-item {
  min-height: 35px;
}

.input-group {
  width: auto;
}
</style>
