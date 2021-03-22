import React, { Component } from 'react'

export default class Brand extends Component {
    constructor() {
        super()
        this.state = {
            brandList: [
                {
                    id: 2,
                    name: '玛莎拉蒂',
                    time: new Date()
                },
                {
                    id: 1,
                    name: '奥迪A6',
                    time: new Date()
                },
            ],
            current: {},
        }
    }
    // 品牌提交
    submit(e) {
        if (e.keyCode === 13) {
            let name = e.target.value;
            if (name === '') {
                alert('请输入品牌名称')
                return
            }
            if (this.state.current.id) {
                // 修改品牌
                this.update(this.state.current, name)
            } else {
                this.add(name)
            }
            // 清空value中的值
            e.target.value = ''

        }
    }
    // 添加平拍
    add(name) {
        const { brandList } = this.state;
        let id = brandList.length > 0 ? brandList[0].id + 1 : 1;
        let time = new Date()
        let parmas = {
            id,
            name,
            time,
        }
        brandList.unshift(parmas);
        this.setState({ brandList })
    }
    // 获取要修改的数据
    edit(row) {
        // 将数据获取到输入框中
        document.querySelector('input').value = row.name
        // 将内容存入current中
        this.setState({ current: row })
    }
    update(row, name) {
        const { brandList } = this.state
        const newList = brandList.map(item => {
            if (item.id === row.id) {
                return {
                    ...item,
                    name: name
                }
            } else {
                return item
            }
        })
        this.setState({ brandList: newList })
        // 将current清空
        this.setState({ current: '' })
    }
    //删除
    del(index) {
        this.state.brandList.splice(index, 1);
        this.setState({ brandList: this.state.brandList })  
    }




    render() {
        const { brandList } = this.state
        return (
            <div className='container'>
                <div className='well'>
                    <h2>品牌管理系统</h2>
                    <input className='form-control' type="text" placeholder='请输入品牌名称' onKeyUp={(e) => this.submit(e)} />
                </div>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>品牌名称</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brandList.length > 0 ? brandList.map((item,index) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.time.toLocaleDateString()}</td>
                                <td>
                                    <button className='btn btn-primary' onClick={() => this.edit(item)}>编辑</button>
                                    <button className='btn btn-danger' onClick={() => this.del(index)}>删除</button>
                                </td>
                            </tr>
                        )) : <tr>
                            <td colSpan='4'>暂无数据</td>
                        </tr>
                        }

                    </tbody>

                </table>

            </div>
        )
    }
}
