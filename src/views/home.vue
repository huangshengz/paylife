<template>
    <el-container style="height: 100%">
        <el-header>
            <div style="text-align: left;float:left">
                <span class="el-icon-monitor" style="color: black;font-size: 20px"> 个人生活信息管理系统</span>
            </div>
            <div style="text-align: right;">
                <el-dropdown>
                    <span class="el-dropdown-link el-icon-setting">欢迎您，
                    {{nickname}} <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <el-dropdown-item>完善信息</el-dropdown-item>
                        <el-dropdown-item  @click.native="logout">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container>
            <el-aside style="height: 100%;width: 15%">
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
                    <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">我的生活记录</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item class="el-icon-document" index="1-1" @click="onTag('数据统计')">数据统计</el-menu-item>
                    <el-menu-item class="el-icon-document" index="1-2" @click="onTag('消费记录')">消费记录</el-menu-item>
                    <el-menu-item class="el-icon-document" index="1-2" @click="onTag('个人信息')">个人信息</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
<!--                    <div style="margin-bottom: 20px;">-->
<!--                        <el-button-->
<!--                                size="small"-->
<!--                                @click="addTab(editableTabsValue)"-->
<!--                        >-->
<!--                            add tab-->
<!--                        </el-button>-->
<!--                    </div>-->
<!--                    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">-->
<!--                        <el-tab-pane-->
<!--                                v-for="(item, index) in editableTabs"-->
<!--                                :key="item.name"-->
<!--                                :label="item.title"-->
<!--                                :name="item.name"-->
<!--                        >-->
<!--                        </el-tab-pane>-->
<!--                    </el-tabs>-->
                    <div class="tabs">
                        <span v-for="(item, index) in tabArr" :class="tabIndex == index+1?'active':''" @click="tabsclick(item)"> {{item.title}}<i @click="removetabs(item)">X</i></span>
                    </div>
                    <router-view></router-view>
<!--                    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: left">-->
<!--                        <el-form-item label="消费时间">-->
<!--                            <el-input type="date" v-model="formInline.queryDate" ></el-input>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="消费类型">-->
<!--                            <el-select v-model="formInline.queryType" placeholder="消费类型">-->
<!--                                <el-option label="全部"></el-option>-->
<!--                                <el-option label="食品" value="0"></el-option>-->
<!--                                <el-option label="交通" value="1"></el-option>-->
<!--                                <el-option label="红包" value="2"></el-option>-->
<!--                                <el-option label="水果" value="3"></el-option>-->
<!--                                <el-option label="生活用品" value="4"></el-option>-->
<!--                                <el-option label="化妆品" value="5"></el-option>-->
<!--                                <el-option label="其他" value="6"></el-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item>-->
<!--                            <el-button type="primary" @click="onSubmitQuery">查询</el-button>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item>-->
<!--                            <el-button type="success" @click="onSubmitAdd">新增消费记录</el-button>-->
<!--                        </el-form-item>-->
<!--                    </el-form>-->
<!--                    <el-table-->
<!--                            ref="multipleTable"-->
<!--                            tooltip-effect="dark"-->
<!--                            @selection-change="handleSelectionChange"-->
<!--                            :data="tableData"-->
<!--                            style="width: 100%"-->
<!--                            :default-sort = "{prop: 'crId', order: 'descending'}"-->
<!--                    >-->
<!--                        <el-table-column-->
<!--                                type="selection"-->
<!--                                width="55">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="crId"-->
<!--                                label="ID"-->
<!--                                sortable-->
<!--                                width="90">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="consumerTotal"-->
<!--                                label="消费金额"-->
<!--                                sortable-->
<!--                                width="180">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="consumerType"-->
<!--                                label="消费类型"-->
<!--                                sortable-->
<!--                                width="180"-->
<!--                                :formatter="formatterType">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="consumerAddress"-->
<!--                                label="消费地点"-->
<!--                                sortable-->
<!--                                width="180">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="consumerTime"-->
<!--                                label="消费时间"-->
<!--                                sortable-->
<!--                                width="180">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="consumerDetail"-->
<!--                                label="详情"-->
<!--                                >-->
<!--                        </el-table-column>-->
<!--                        <el-table-column label="操作" align="center" width="200">-->
<!--                            <template slot-scope="scope">-->
<!--                                <el-button size="mini" @click.native="editrow(scope.$index, scope.row)">编辑</el-button>-->
<!--                            </template>-->
<!--                        </el-table-column>-->
<!--                    </el-table>-->
<!--                    <div class="block" style="text-align: left">-->
<!--                        <el-pagination-->
<!--                                @size-change="handleSizeChange"-->
<!--                                @current-change="handleCurrentChange"-->
<!--                                :current-page="currentPage4"-->
<!--                                :page-sizes="[5, 10, 15]"-->
<!--                                :page-size="100"-->
<!--                                layout="total, sizes, prev, pager, next, jumper"-->
<!--                                :total="400">-->
<!--                        </el-pagination>-->
<!--                    </div>-->
                </el-main>
                <el-footer>技术支持：三树唐五</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>
<style>
    .tabs{
        text-align: left;
        border-bottom: 1px solid #000;
    }
    .tabs>span{
        height: 40px;
        line-height: 40px;
        width: 120px;
        display: inline-block;
        text-align: center;
        position: relative;
        cursor: pointer;
        margin: 0 5px;
        border: 1px solid #000;
        border-bottom: unset;
    }
    .tabs>span.active{
        background: #fff;
    }
    .tabs>span>i{
        position: absolute;
        height: 15px;
        width: 15px;
        font-style: normal;
        line-height: 15px;
        text-align: center;
        top: 10px;
        right: 5px;
        border-radius: 50%;
        background: red;
        color: #fff;
        font-size: 10px;
    }

    .tabs>span>i:hover{
        background: blue;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    body > .el-container {
        margin-bottom: 40px;
    }
    .el-table td,.el-table th{
        text-align: center;
    }
    .el-menu-item-group .el-menu-item.el-icon-document{
        display: block;
    }
</style>
<style scoped>
    .el-main{
        line-height: unset;
    }
</style>

<script>
    import axios from 'axios'
    export default {
        data() {
            // const item = {
            //     date: '2016-05-02',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1518 弄'
            // };
            return {
                token:sessionStorage.getItem("token"),
                nickname:sessionStorage.getItem("nickName"),
                isCollapse:false,
                currentPage:4,
                // tableData: [],
                multipleSelection: [],
                // formInline: {
                //     queryDate: '',
                //     queryType: ''
                // },
                editableTabsValue: '1',
                editableTabs: [{
                    title: '首页',
                    name: '1',
                    content: ''
                }],
                tabIndex: 1,
                tabArr:[]
            }
        },
        mounted(){
            // axios.get(this.GLOBAL.baseURL + '/life/list',
            //     {
            //         headers: {
            //             'token': sessionStorage.getItem("token"),
            //         },
            //         params: {
            //             current: 1,
            //             size: 10
            //         },
            //     }
            // ).then((res) => {
            //     console.log(res.data.data.records)
            //     this.tableData = res.data.data.records;
            //
            // })
        },
        methods:{
            removetabs(item){
                var data = this.tabArr
                console.log(item)
                data.splice(item.index-1,1)
                console.log(data[data.length-1])
                this.$router.push({path:data[data.length-1].path})
                this.tabIndex = data[data.length-1].index-1
                this.tabArr = data
            },
            tabsclick(item){
                console.log(item)
                this.$router.push({path:item.path})
                this.tabIndex = item.index
            },
            shouqi(){
                this.isCollapse = !this.isCollapse
            },
            logout(){
                this.$confirm('您将退出当前系统, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$router.push({path:'/login'})
                    this.$message({
                        type: 'success',
                        message: '您已退出!'
                    });
                });
            },
            // formatterType(row, column) {
            //     // 消费类型：0是食品，1是交通，2是红包，3是水果，4是生活用品，5是化妆品，6是其他
            //     let t =  "生活";
            //     if (row.consumerType === 0) {
            //         t = "食品";
            //     }
            //     if (row.consumerType === 1) {
            //         t = "交通";
            //     }
            //     if (row.consumerType === 2) {
            //         t = "红包";
            //     }
            //     if (row.consumerType === 3) {
            //         t = "水果";
            //     }
            //     if (row.consumerType === 4) {
            //         t = "生活用品";
            //     }
            //     if (row.consumerType === 5) {
            //         t = "化妆品";
            //     }
            //     if (row.consumerType === 6) {
            //         t = "其他";
            //     }
            //     return t;
            // },
            // toggleSelection(rows) {
            //     if (rows) {
            //         rows.forEach(row => {
            //             this.$refs.multipleTable.toggleRowSelection(row);
            //         });
            //     } else {
            //         this.$refs.multipleTable.clearSelection();
            //     }
            // },
            // handleSelectionChange(val) {
            //     this.multipleSelection = val;
            // },
            // onSubmitQuery(form) {
            //     console.log('submit!');
            //     console.log(this.formInline.queryDate);
            //     console.log(this.formInline.queryType);
            //     axios.get(this.GLOBAL.baseURL + '/life/list',
            //         {
            //             headers: {
            //                 'token': sessionStorage.getItem("token"),
            //             },
            //             params: {
            //                 current: 1,
            //                 size: 10,
            //                 consumerTime: this.formInline.queryDate,
            //                 consumerType: this.formInline.queryType
            //             },
            //         }
            //     ).then((res) => {
            //         console.log(res.data.data.records)
            //         // this.tableData = res.data.data.records;
            //
            //     })
            // },
            // handleCurrentChange(val) {
            //     console.log(`当前页: ${val}`);
            // },
            onTag(e) {
                var obj = {
                    title:'',
                }
                if(e === '数据统计'){
                    obj.title = '数据统计'
                    obj.path = '/home/indexData'
                    obj.index = 1
                    this.tabIndex = obj.index
                    this.$router.push({path:'/home/indexData'})
                    if (JSON.stringify(this.tabArr).indexOf('数据统计') < 0) {
                        this.tabArr.push(obj)
                    }
                }
                if(e === '消费记录'){
                    obj.title = '消费记录'
                    obj.path = '/home/main'
                    obj.index = 2
                    this.tabIndex = obj.index
                    this.$router.push({path:'/home/main'})
                    if (JSON.stringify(this.tabArr).indexOf('消费记录') < 0) {
                        this.tabArr.push(obj)
                    }
                }
                if(e == '个人信息'){
                    obj.title = '个人信息'
                    obj.path = '/home/userinfo'
                    obj.index = 3
                    this.tabIndex = obj.index
                    this.$router.push({path:'/home/userinfo'})
                    if (JSON.stringify(this.tabArr).indexOf('个人信息') < 0) {
                        this.tabArr.push(obj)
                    }
                }
                // this.editableTabs.push({
                //     title: e,
                //     name: 'new table'+ this.tabIndex
                // });
                // this.editableTabsValue = this.tabIndex + '';
            },
            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }

                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            }
        }
    };
</script>