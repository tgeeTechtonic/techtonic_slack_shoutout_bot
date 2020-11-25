<template>
  <article class="company-values">
    <section class="company-values__table">
      <DataTable
        class="item-container__table"
        :data="values"
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
      return this.$store.state.companyValues;
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as v;

.company-values {
  display: flex;
  justify-content: space-evenly;

  .item-container {
    &__table {
      width: calc(100vw - 2em);
    }
  }
}
</style>
