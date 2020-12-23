<template>
  <v-main>
    <AppPageHeader
      icon="mdi-cup"
      title="Produtos"
      :breadcrumbs="[
        { text: 'Home', to: '/', exact: true },
        { text: 'Produtos', to: '/products', exact: true },
      ]"
    />
    <v-container grid-list-md fluid>
      <v-card class="mx-auto">
        <v-toolbar
          dark
          color="grey darken-2"
          flat
          extension-height="70"
          height="80"
        >
          <v-toolbar-title> Produtos cadastrados </v-toolbar-title>
          <v-spacer />
          <template v-slot:extension>
            <v-text-field
              label="Pesquisar"
              solo-inverted
              filled
              flat
              clearable
              prepend-inner-icon="mdi-account-search"
              v-model="productSearch"
              @keypress.enter.native="handleSearchProduct"
              append-icon="mdi-magnify"
              @click:append="handleSearchProduct"
              @click:clear="handleSearchProduct"
              :loading="productSearchLoading"
            />
          </template>
        </v-toolbar>
        <template v-if="products.length >= 1">
          <v-list-item
            three-line
            v-for="(product, index) in products"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title>
                <strong>Marca: </strong> {{ product.brand }} -
                <strong>Produto: </strong> {{ product.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ `R$ ${parseFloat(product.value).toLocaleString("pt-BR")}` }}
                - há {{ product.stock }} produtos no estoque
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="caption">
              Atualizado há {{ formatDateDistance(product.updated_at) }}
            </v-list-item-action>
          </v-list-item>
          <v-card-actions class="d-flex justify-center pa-5">
            <v-btn
              :loading="productLoadMoreLoading"
              :disabled="productRequestPage === productRequestLastPage"
              @click="handleLoadMoreProducts"
            >
              Carregar mais produtos
            </v-btn>
          </v-card-actions>
        </template>
        <v-card-text v-else class="text-center pa-8">
          <h1 class="font-weight-thin">
            Não foi encontrado nenhum usuário para essa busca
          </h1>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import { dateMixin } from "~/mixins/dateMixin"
import Product from "~/models/Product"

export default {
  head() {
    return {
      title: "Produtos",
    }
  },
  data() {
    return {
      products: [],
      productSearch: "",
      productRequestPage: 1,
      productRequestLastPage: null,
      productRequestLimit: 5,
      productSearchLoading: false,
      productLoadMoreLoading: false,
    }
  },
  async fetch() {
    await this.handleGetProducts()
  },
  mixins: [dateMixin],
  methods: {
    async handleGetProducts() {
      const request = await Product.page(this.productRequestPage)
        .where("name_or_brand", this.productSearch)
        .limit(this.productRequestLimit)
        .get()
      this.productRequestPage = request.current_page
      this.productRequestLastPage = request.last_page
      this.products.push(...request.data)
    },
    async handleLoadMoreProducts() {
      this.productLoadMoreLoading = true
      this.productRequestPage++
      await this.handleGetProducts()
      this.productLoadMoreLoading = false
    },
    async handleSearchProduct() {
      this.productSearchLoading = true
      this.productRequestPage = 1
      this.productRequestLastPage = null
      this.products = []
      await this.handleGetProducts()
      this.productSearchLoading = false
    },
  },
}
</script>
