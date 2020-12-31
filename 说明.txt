<!-- 
   一、
    1.搭建后台管理系统 使用vue+element 
    2 node.js后台搭建

    二、功能
    1.分权限，不同账号展示不同的路由
    2，管理员可查看用户管理页面、订单列表页面、销售人员页面，用户反馈页面、用户页面，员工任务计划页面
    3.员工可显示订单列表、个人信息页面、任务计划页面，增加计划、修改计划，总销售额为必填字段。用于日统计完成情况。
    4.用户信息页面、订单列表、信息反馈页面
    5.管理员模拟完成用户购买记录

    总结：模拟操作页面、用户列表、商品列表。销售人员列表、反馈页面，订单页面，echart销售统计页面，任务计划页面
    共8个页面

    三、数据库
    表1 产品分类
    id  productName  比如母婴，玩具、笔记本等
    表2  用户 user
    id
    name 
    telephone
    address
    credit 


    表3 商品 goods
    id
    goodsName
    productionTime
    price
    productName  产品分类名字


    表4 订单列表 order
    id
    goodsid
    userid  
    username
    count 购买数量
    price 
    salesman
    salesCommission 销售提成
    
    表 5 反馈列表
    姓名，时间，内容，产品编号
    id
    userid
    username
    createTime
    feedbackInfo
    status 0 待解决 1 已解决
    goodsid

    表6 任务列表
    id 
    customersNumber 
    businessid 
    salesVolume 
    planTime

    表7 销售人员表
    id
    taskid 任务计划id
    name
    telephone
    salesVolume 业务员销售额
    money


 -->
