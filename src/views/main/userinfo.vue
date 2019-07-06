<template>
    <div>
        userinfo
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                formInline: {
                    queryDate: '',
                    queryType: '',
                    tableData: [],
                },
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
        }
    }
</script>