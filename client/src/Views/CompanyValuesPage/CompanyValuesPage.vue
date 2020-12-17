<template>
  <article class="company-values">
    <section class="company-values__table">
      <DataTable
        class="company-values-container__table"
        :data="values"
        :expandable="{
          type: 'singleExpand',
          row: valueDescriptions,
          content: 'description',
        }"
        :loading="loading"
        :restricted="{ footer: 'disable-items', disableSort: true }"
        :searchable="true"
        title="Company Values"
      />
    </section>
  </article>
</template>

<script>
import DataTable from '@/components/common/DataTable';

export default {
  name: 'CompanyValues',
  components: { DataTable },
  created() {
    this.$store.dispatch('getCompanyValues');
  },
  computed: {
    loading() {
      return this.$store.state.loading.companyValues;
    },
    values() {
      return this.$store.state.companyValues.map((value) => {
        return {
          id: value.id,
          value: value.value,
          num_times_used: value.num_times_used,
          top_user_shoutouts_given: value.top_user_shoutouts_given,
          top_user_shoutouts_received: value.top_user_shoutouts_received,
        };
      });
    },
    valueDescriptions() {
      return this.$store.state.companyValues.map(({ id, description }) => {
        return { id, description };
      });
    },
  },
};
</script>

<style lang="scss">
@use '@/assets/styles/variables.scss' as v;

.company-values {
  display: flex;
  justify-content: space-evenly;

  .company-values-container {
    &__table {
      width: calc(100vw - 2em);
      max-width: 990px;
    }
  }
  .v-data-table__expanded .v-data-table__mobile-row {
    background-color: v.$accent-green-highlight;
    color: v.$main-black-overlay;
    font-weight: 400;
  }

  .v-data-table__expanded {
    background-color: v.$accent-green;
    color: v.$main-white;
    font-weight: 600;

    &:hover {
      background-color: v.$accent-green !important;
      color: v.$main-white;
      font-weight: 600;
    }
  }
  .v-data-table__expanded__content td {
    background-color: v.$table-white;
    box-shadow: inset 0px 0px 75px -14px v.$accent-green-highlight,
      inset 0px 0px 75px -14px v.$accent-green-highlight;
    color: v.$main-black-overlay;
    font-weight: 400;
    padding: 30px !important;
  }
}
</style>
