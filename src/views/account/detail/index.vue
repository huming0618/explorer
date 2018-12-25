<template>
  <div class="app-container block-detail">
    <el-row>
      <el-col :span="12">
        <el-form :inline="true" :model="form">
          <el-form-item label="账户地址" class="label-class" required prop="address">
            <el-input v-model="form.address" size="max" placeholder="账户地址" autofocus="true" type="string"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fetchData">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-form v-show="account.address" :inline="true" :model="form">
          <el-form-item label="领取测试网代币" class="label-class" prop="address">
            <el-input size="max" placeholder="代币数目" autofocus="true" type="string" value="1000" maxlength="10"/>
          </el-form-item>
          <el-form-item class="label-class">
            <el-dropdown trigger="click" @command="getReward">
              <el-button type="success">
                QOST<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="qos">qos</el-dropdown-item>
                <el-dropdown-item command="qsc">qsc</el-dropdown-item>
                <el-dropdown-item command="qstar">qstar</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fetchData">领取</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div v-show="account.address">
      <el-card class="box-card">
        <div slot="header" class="card-header">
          <span>Account Message</span>
        </div>
        <el-row>
          <div class="row">
            <div class="left label">address</div>
            <div class="right label">
              {{ account.address }}
            </div>
          </div>
        </el-row>
        <el-row>
          <div class="row">
            <div class="left label">nonce</div>
            <div class="right label">
              {{ account.nonce }}
            </div>
          </div>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="card-header">
          <span>Coins</span>
        </div>
        <div class="app-container">
          <q-table :data="account.coins">
            <template slot-scope="props">
              <q-column :value="props.row.coin_name" label="coin_name" width="150px"/>
              <q-column :value="props.row.amount" label="amount" width="80px"/>
            </template>
          </q-table>
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="card-header">
          <span>Txs</span>
        </div>
        <div class="app-container">
          <q-table :data="txs">
            <template slot-scope="props">
              <q-column :row="props.row" label="height" width="100px">
                <template slot-scope="p">
                  <router-link :to="{ name: 'TxDetail', params: { height: p.row.height, index:p.row.index }}" class="primary">
                    {{ p.row.height }}
                  </router-link>
                </template>
              </q-column>
              <q-column :value="props.row.index" label="index" width="70px"/>
              <q-column :value="props.row.tx_type" label="tx_type" width="150px"/>
              <q-column :value="props.row.maxgas" label="maxgas" width="80px"/>
              <q-column :value="props.row.qcp_from" label="qcp_from" width="100px"/>
              <q-column :value="props.row.qcp_to" label="qcp_to" width="100px"/>
              <q-column :value="props.row.qcp_sequence" label="qcp_sequence" width="100px"/>
              <q-column :value="props.row.qcp_txindex" label="qcp_txindex" width="100px"/>
              <q-column :value="props.row.qcp_isresult" label="qcp_isresult" width="100px"/>
              <q-column :value="props.row.time" label="created_at"/>
            </template>
          </q-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import '@/assets/font/iconfont.css'
import {
  getAccount, getAccountTxs
} from './api'

export default {
  components: {
    qTable: () => import('@/components/common/qtable.vue'),
    qColumn: () => import('@/components/common/qcolumn.vue')
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      isShow: false,
      form: {
        address: ''
      },
      account: {
        coins: []
      },
      rewards: {
        coins: []
      },
      txs: [],
      listLoading: true
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    async fetchData() {
      this.account = { coins: [] }
      this.listLoading = true
      const response = await getAccount(this.form)
      this.account = response.result
      this.listLoading = false

      this.fetchAccountTxs(this.form)
    },
    async fetchAccountTxs() {
      const response = await getAccountTxs(this.form)
      this.txs = response.result
    },
    getReward(coin) {
      this.$message('click on item ' + coin)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import '@/styles/px2rem.scss';

  .block-detail {
    .box-card {
      margin-top: 15px;

      &:first-child {
        margin: 0 auto;
      }
    }

    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }

    .label {
      min-height: 40px;
      display: flex;
      align-items: center;
      word-break: break-all;
    }

    .row {
      display: flex;
      align-items: center;

      .left {
        width: 160px;
      }

      @media only screen and (max-width: 760px),
      (min-device-width: 768px) and (max-device-width: 1024px) {
        .left {
          width: 110px;
        }
      }

      .right {
        flex: 1;
      }
    }
  }

</style>
