            currentPanel:{},
            reportDetail:{},//报表详情
            panelList:[],
            workSheetList:[],
            serializedData:[
                    {x: 0, y: 0, width: 2, height: 2},
                    {x: 3, y: 1, width: 1, height: 2}
                ], 
            confirmLoading: false,
            editPanelNameModalVisible: false,//编辑页面名字Modal

            selectWorkSheetModalVisible:false,//选择工作表Modal
            chartCatalogList: [], //工作表列表
            catalogList:[],//目录列表(包含工作表)
            selectWorkSheetId:0,//被选择的工作表id

            resultData:{},
            tableContent:'',

            oldPanel:{},//存放编辑之前的panel，以防用户取消编辑后，无法恢复当前状态下的tab panel
            reportReleaseStatus:'发布',
            reportStatusText:'未发布',

            releaseReportModalVisible:false,//发布报表Modal
            
            userList:[],//权限用户列表
            selectedUsernameList: [],//已选择用户名列表
            selectedUserList:[],//已选择用户列表
            publicPowerPanelVisible:'',
            selectPowerPanelVisible:'not-display',
            powerType:"0",//0-公开权限  1-部分人可见
            powerTypeText:'公开权限',
            editPowerPanelVisible:'',//编辑权限
            showPowerPanelVisible:'not-display',//权限详情
            showSelectUserVisible:'not-display',//已选择用户详情
            releaseReportTitle:'发布报表',
            releaseBtnText:'确认发布',
            createMenuVisible: false,
            createReportVisible: false,
            visible3: false,
            customTimeFilterVisible: false,
            createCatalogApi: 'report/npa/createCatalog',
            deleteCatalogApi: 'report/npa/deleteCatalog',
            getListApi: 'report/npa/catalogWithReports',
            getChartCatalogListApi: 'chart/npa/catalogWithCharts',
            addReportApi: 'report/npa/addReport',
            deleteReportApi: 'report/npa/deleteReport',
            editReportApi: 'report/npa/editReport',
            renameCatalogApi: 'report/npa/editCatalog',
            getRelateFieldApi: 'report/npa/getRelateField',
            getOverallFilterApi: 'report/npa/getOverallFilter',
            deleteFilterApi: 'report/npa/deleteFilter',
            saveFilterApi: 'report/npa/saveOrUpdateFilter',
            catalogName: '',
            dirState: '1',
            href: '#/report/',
            isRelease: 0,
            getDetailReportId: 0,
            reportTitle: '',
            selectMenuListId: 0,  //被选择的目录id

            visibleCls:'not-display',//编辑报表面板"请点击左侧菜单查看报表详情"
            tipCardVisibleCls:'',//首次进入页面时提示，点击左侧菜单操作
            addWorkSheetTipCardVisibleCls:'not-display',

            globalFilterVisible: false,
            filterPanelList: [],
            filterCheckboxes: [],
            currentFilterPanel: {},
            options: [],
            checked: [],
            timeFilter: {},
            customTimeSegment: '自定义时间段',
            timeFilterSelected: 0,
            selectedRelate: '',
            powerActiveKey: '权限1',
            powerPanelList:[{ title: '权限1', content: '选项卡一内容', key: '权限1' }],
            powerList:[{"id":0,"powerName":"权限1","relateDashboard":[],"selectedUserList":[]}],//具体权限 [{"id":1,"powerName":"集团领导","relateDashboard":[1,2,3],"selectedUserList":["zhangle","wuyongjie","yangming"]}]
            currentPowerPanel:{ title: '权限1', content: '选项卡一内容', key: '权限1' },
            currentPower:{"id":0,"powerName":"权限1","relateDashboard":[],"selectedUserList":[]},//当前正在编辑的权限 {"id":1,"powerName":"集团领导","relateDashboard":[1,2,3],"selectedUserList":["zhangle","wuyongjie","yangming"]}

        }