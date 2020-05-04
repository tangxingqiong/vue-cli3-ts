import {request} from '../api'

export default {
    //设计审查---项目列表
    getDesignProjectList: request('/design/project/lists'),
    //设计单位
    getDesignCompanyList: request('/design/company/lists'),

    //需要统计项目数据
    getDesignStatisticsProjectList: request('/design/statistics/lists'),
    //申报项目个数
    getDesignStatisticsChartData: request('/design/statistics/chart-data',{method: 'get'}),
    //申报项目面积
    getDesignStatisticsProjectArea: request('/design/statistics/project-area',{method: 'post'}),
    // 生成数据
    statisticsBuild : request('/design/statistics/build', {method: 'post'}),


    //获取子项列表
    getsubitemList: request('/design/subitem/lists'),
    //获取子项类型列表
    getsubitemTypeList: request('/design/subitem-type/lists'),
    //添加子项
    subitemAdd: request('/design/subitem/add', {method: 'post'}),
    // 获取待分组子项
    subitemSpecial: request('/design/subitem/special'),
    //获取项目参与单位列表
    projectCompanyLists: request('/design/project-company/lists'),
    //获取单个子项信息
    getsubitemInfo: request('/design/subitem/info'),
    //删除子项
    subitemDelete: request('/design/subitem/delete', {method: 'post'}),
    //获取单个子项信息
    subitemEdit: request('/design/subitem/edit', {method: 'post'}),
    // 质量评分表
    getDownTable: request('/design/subitem/down-table'),

    // 子项审查表格
    getReviewTable: request('/design/review/table'),
    // 单个审查要点提交
    putReviewItem: request('/design/review/item', {method: 'post'}),
    // 单个审查要点提交
    putReviewStepSumit: request('/design/review/step-submit', {method: 'post'}),
    // 检查子项审查要点是否审查完毕
    checkStepOver: request('/design/review/check-step-over', {method: 'post'}),
    // 获取审查内容结果
    reviewDetail: request('/design/review/detail'),
    // 获取审查内容结果-子项
    reviewDetailList: request('/design/review/lists'),


    //获取项目详情
    getprojectInfo: request('/design/project/info'),


    //创建图纸版本
    drawingVersionAdd: request('/design/drawing/add-version', {method: 'post'}),
    //获取图纸文件版本列表
    getDrawingVersionLists: request('/design/drawing/version-lists'),
    //获取图纸文件列表
    getDrawingLists: request('/design/drawing/lists'),
    //删除图纸文件
    drawingDelete: request('/design/drawing/delete', {method: 'post'}),
    //上传图纸文件
    getdrawingAdd: request('/design/drawing/add'),
    //下载图纸文件
    drawingDownload: request('/design/drawing/download', {method: 'post'}),


    //获取审查步骤
    launchStep: request('/design/launch/step'),
    //获取发起审查列表
    getLaunchLists: request('/design/launch/lists'),
    //发起审查
    launchInit: request('/design/launch/init', {method: 'post'}),
    // 修改审查时间
    launchEdit: request('/design/launch/edit', {method: 'post'}),


    //获取专业
    getModuleMajorLists: request('/design/module-major/lists'),
    // 获取专业下子项类型列表
    getSubitemTypeLists: request('/design/subitem-type/lists'),
    // 获取审查要点表格
    getClauseTable: request('/design/clause/table'),
    //获取要点
    getClauseLists: request('/design/clause/lists', {method: 'post'}),


    //获取人员配置列表
    getStaffLists: request('/design/staff/lists'),
    //批量添加人员配置
    staffListsAddbatch: request('/design/staff/add-batch', {method: 'post'}),
    //添加单个人员配置
    staffAdd: request('/design/staff/add', {method: 'post'}),
    //修改单个人员配置
    staffEdit: request('/design/staff/edit', {method: 'post'}),
    //获取公司默认人员配置
    getStaffDefaultLists: request('/design/staff/default-lists'),
    //获取可添加子项列表
    getSubitemFree: request('/design/subitem/free'),
    //获取专业下的职位列表
    getStaffRoleLists: request('/design/staff/role-lists'),
    //删除人员配置
    staffDelete: request('/design/staff/delete', {method: 'post'}),
    // 人员查找
    findUser: request('/design/staff/find-user'),


    // 获取项目流程进度
    getProcessLists: request('/design/process/lists'),
    // 获取项目审查节点详细信息
    getProcessStepDetal: request('/design/process/step-detail'),


    //获取审查内容列表
    getReviewLists: request('/design/review/lists'),
    //获取当前用户审查内容
    getMyLists: request('/design/review/my-lists'),
    //当前用户任务列表
    getTaskMyLists: request('/design/task/my-lists'),


    chunksMerge: request('/design/upload/chunks-merge', {method: 'post'}),

    drawingAdd: request('/design/drawing/add', {method: 'post'}),

    fileLists: request('/design/file/lists'),
    fileAdd: request('/design/file/add', {method: 'post'}),
    fileEdit: request('/design/file/edit', {method: 'post'}),
    fileDel: request('/design/file/del', {method: 'post'}),
    fileDownload: request('/design/file/download', {method: 'post'}),
    fileDownloadFile: request('/design/file/download-file', {method: 'post'}),
    fileChunksMerge: request('/design/file/chunks-merge', {method: 'post'})
}
