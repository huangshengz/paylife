<template>
    <div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: left">
        <el-form-item label="消费时间">
            <el-input type="date" v-model="formInline.queryDate" ></el-input>
        </el-form-item>
        <el-form-item label="消费类型">
            <el-select v-model="formInline.queryType" placeholder="消费类型">
                <el-option label="全部" value="7"></el-option>
                <el-option label="食品" value="0"></el-option>
                <el-option label="交通" value="1"></el-option>
                <el-option label="红包" value="2"></el-option>
                <el-option label="水果" value="3"></el-option>
                <el-option label="生活用品" value="4"></el-option>
                <el-option label="化妆品" value="5"></el-option>
                <el-option label="其他" value="6"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmitQuery">查询</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="onSubmitAdd">新增消费记录</el-button>
        </el-form-item>
    </el-form>
    <el-table
            ref="multipleTable"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            :data="tableData"
            style="width: 100%"
            :default-sort = "{prop: 'crId', order: 'descending'}"
    >
        <el-table-column
                type="selection"
                width="55">
        </el-table-column>
        <el-table-column
                prop="crId"
                label="ID"
                sortable
                width="90">
        </el-table-column>
        <el-table-column
                prop="consumerTotal"
                label="消费金额"
                sortable
                width="180">
        </el-table-column>
        <el-table-column
                prop="consumerType"
                label="消费类型"
                sortable
                width="180"
                :formatter="formatterType">
        </el-table-column>
        <el-table-column
                prop="consumerAddress"
                label="消费地点"
                sortable
                width="180">
        </el-table-column>
        <el-table-column
                prop="consumerTime"
                label="消费时间"
                sortable
                width="180">
        </el-table-column>
        <el-table-column
                prop="consumerDetail"
                label="详情"
        >
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
<!--                <el-button size="mini" @click.native="editrow(scope.$index, scope.row)">编辑</el-button>-->
            </template>
        </el-table-column>
    </el-table>
    <div class="block" style="text-align: left">
<!--        <el-pagination-->
<!--                @size-change="handleSizeChange"-->
<!--                @current-change="handleCurrentChange"-->
<!--                :current-page="currentPage4"-->
<!--                :page-sizes="[5, 10, 15]"-->
<!--                :page-size="100"-->
<!--                layout="total, sizes, prev, pager, next, jumper"-->
<!--                :total="400">-->
<!--        </el-pagination>-->
    </div>

    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return {
                formInline: {
                    queryDate: '',
                    queryType: '',
                },
                tableData: [],
            }
        },
        mounted(){
            axios.get(this.GLOBAL.baseURL + '/life/list',
                {
                    headers: {
                        'token': sessionStorage.getItem("token"),
                    },
                    params: {
                        current: 1,
                        size: 10
                    },
                }
            ).then((res) => {
                console.log(res.data.data.records)
                this.tableData = res.data.data.records;

            })
        },
        methods:{
            onSubmitAdd(){},
            onSubmitQuery(form) {
                console.log('submit!');
                console.log(this.formInline.queryDate);
                console.log(this.formInline.queryType);
                axios.get(this.GLOBAL.baseURL + '/life/list',
                    {
                        headers: {
                            'token': sessionStorage.getItem("token"),
                        },
                        params: {
                            current: 1,
                            size: 10,
                            consumerTime: this.formInline.queryDate,
                            consumerType: this.formInline.queryType
                        },
                    }
                ).then((res) => {
                    console.log(res.data.data.records)
                    this.tableData = res.data.data.records;
                })
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            formatterType(row, column) {
                // 消费类型：0是食品，1是交通，2是红包，3是水果，4是生活用品，5是化妆品，6是其他
                let t =  "生活";
                if (row.consumerType === 0) {
                    t = "食品";
                }
                if (row.consumerType === 1) {
                    t = "交通";
                }
                if (row.consumerType === 2) {
                    t = "红包";
                }
                if (row.consumerType === 3) {
                    t = "水果";
                }
                if (row.consumerType === 4) {
                    t = "生活用品";
                }
                if (row.consumerType === 5) {
                    t = "化妆品";
                }
                if (row.consumerType === 6) {
                    t = "其他";
                }
                return t;
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            onSubmitQuery(form) {
                console.log('submit!');
                console.log(this.formInline.queryDate);
                console.log(this.formInline.queryType);
                axios.get(this.GLOBAL.baseURL + '/life/list',
                    {
                        headers: {
                            'token': sessionStorage.getItem("token"),
                        },
                        params: {
                            current: 1,
                            size: 10,
                            consumerTime: this.formInline.queryDate,
                            consumerType: this.formInline.queryType
                        },
                    }
                ).then((res) => {
                    console.log(res.data.data.records)
                    // this.tableData = res.data.data.records;

                })
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
        }
    }
</script>