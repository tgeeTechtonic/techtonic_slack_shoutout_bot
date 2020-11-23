<template>
  <article class="company-values">
    <section class="company-values__table">
      <Table
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
import Table from '../Reports/Table';
import { companyValuesFormatter } from '../../shared/formatters';

export default {
  name: 'CompanyValues',
  components: { Table },
  data() {
    return {
      loading: false,
      values: []
    };
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch('getCompanyValues');
    this.loading = false;
    this.values = companyValuesFormatter(this.$store.state.companyValues);
  },
};
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables.scss' as v;

.company-values {
  display: flex;
  justify-content: space-evenly;

  &__table {
    width: 100%;
  }
}
</style>
