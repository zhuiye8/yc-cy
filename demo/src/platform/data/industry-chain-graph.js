/**
 * 产业链图谱数据 — 由 scripts/build_industry_chain_graph.mjs 从 GICS 数据集自动生成。
 * 数据源：gics_local_site_v9/extensions/<gics>/<chain>_对外版.md
 * 不要手工编辑此文件，重新运行脚本即可刷新。
 *
 * 节点字段：{ id, name, children? }
 */

export const industryChainGraphData = {
  materials: {
    upstream: {
      label: "上游",
      root: {
        id: "materials-upstream",
        name: "专用化学品",
        children: [
          {
            id: "materials-1",
            name: "高频高速电子材料",
            children: [
              {
                id: "materials-1-1",
                name: "基础介质与导体原料",
                children: [
                  {
                    id: "materials-1-2",
                    name: "基础介质树脂",
                    children: [
                      {
                        id: "materials-1-3",
                        name: "改性环氧树脂"
                      },
                      {
                        id: "materials-1-4",
                        name: "PPE/PPO及烃系树脂"
                      },
                      {
                        id: "materials-1-5",
                        name: "PTFE树脂"
                      },
                      {
                        id: "materials-1-6",
                        name: "聚酰亚胺树脂"
                      },
                      {
                        id: "materials-1-7",
                        name: "LCP介质树脂"
                      },
                      {
                        id: "materials-1-8",
                        name: "BT与氰酸酯树脂"
                      }
                    ]
                  },
                  {
                    id: "materials-1-9",
                    name: "增强与功能填料",
                    children: [
                      {
                        id: "materials-1-10",
                        name: "低Dk玻纤布"
                      },
                      {
                        id: "materials-1-11",
                        name: "二氧化硅填料"
                      },
                      {
                        id: "materials-1-12",
                        name: "陶瓷填料"
                      },
                      {
                        id: "materials-1-13",
                        name: "固化剂与促进剂"
                      },
                      {
                        id: "materials-1-14",
                        name: "偶联剂与阻燃体系"
                      }
                    ]
                  },
                  {
                    id: "materials-1-15",
                    name: "导体材料",
                    children: [
                      {
                        id: "materials-1-16",
                        name: "HVLP/VLP电解铜箔"
                      },
                      {
                        id: "materials-1-17",
                        name: "RA压延铜箔"
                      },
                      {
                        id: "materials-1-18",
                        name: "超薄铜箔"
                      },
                      {
                        id: "materials-1-19",
                        name: "载体铜箔"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-1-20",
                name: "基材与复合材料体系",
                children: [
                  {
                    id: "materials-1-21",
                    name: "刚性高速板材",
                    children: [
                      {
                        id: "materials-1-22",
                        name: "高速FR-4材料"
                      },
                      {
                        id: "materials-1-23",
                        name: "低损耗覆铜板"
                      },
                      {
                        id: "materials-1-24",
                        name: "超低损耗覆铜板"
                      },
                      {
                        id: "materials-1-25",
                        name: "半固化片"
                      }
                    ]
                  },
                  {
                    id: "materials-1-26",
                    name: "高频微波板材",
                    children: [
                      {
                        id: "materials-1-27",
                        name: "PTFE基高频层压板"
                      },
                      {
                        id: "materials-1-28",
                        name: "烃系陶瓷高频层压板"
                      },
                      {
                        id: "materials-1-29",
                        name: "Bondply粘结片"
                      }
                    ]
                  },
                  {
                    id: "materials-1-30",
                    name: "柔性与刚挠材料",
                    children: [
                      {
                        id: "materials-1-31",
                        name: "FCCL柔性覆铜板"
                      },
                      {
                        id: "materials-1-32",
                        name: "低损耗柔性介质"
                      },
                      {
                        id: "materials-1-33",
                        name: "刚挠结合材料"
                      },
                      {
                        id: "materials-1-34",
                        name: "Coverlay与粘结膜"
                      }
                    ]
                  },
                  {
                    id: "materials-1-35",
                    name: "封装与嵌入式介质",
                    children: [
                      {
                        id: "materials-1-36",
                        name: "ABF积层绝缘膜"
                      },
                      {
                        id: "materials-1-37",
                        name: "RCC树脂覆铜箔"
                      },
                      {
                        id: "materials-1-38",
                        name: "嵌入电容材料"
                      },
                      {
                        id: "materials-1-39",
                        name: "封装介电薄膜"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-1-40",
                name: "制程配套与性能验证",
                children: [
                  {
                    id: "materials-1-41",
                    name: "制程配套材料",
                    children: [
                      {
                        id: "materials-1-42",
                        name: "干膜与液态光刻胶"
                      },
                      {
                        id: "materials-1-43",
                        name: "阻焊油墨"
                      },
                      {
                        id: "materials-1-44",
                        name: "棕化黑化材料"
                      },
                      {
                        id: "materials-1-45",
                        name: "去胶渣与表面处理药水"
                      },
                      {
                        id: "materials-1-46",
                        name: "化学镀铜材料"
                      }
                    ]
                  },
                  {
                    id: "materials-1-47",
                    name: "制造与图形化工艺",
                    children: [
                      {
                        id: "materials-1-48",
                        name: "浸胶与制备"
                      },
                      {
                        id: "materials-1-49",
                        name: "层压压合"
                      },
                      {
                        id: "materials-1-50",
                        name: "机械钻孔"
                      },
                      {
                        id: "materials-1-51",
                        name: "激光钻孔"
                      },
                      {
                        id: "materials-1-52",
                        name: "SAP与MSAP细线路工艺"
                      },
                      {
                        id: "materials-1-53",
                        name: "蚀刻与线路形成"
                      }
                    ]
                  },
                  {
                    id: "materials-1-54",
                    name: "关键性能验证",
                    children: [
                      {
                        id: "materials-1-55",
                        name: "Dk与Df测试"
                      },
                      {
                        id: "materials-1-56",
                        name: "Tg与Td测试"
                      },
                      {
                        id: "materials-1-57",
                        name: "CTE与尺寸稳定性测试"
                      },
                      {
                        id: "materials-1-58",
                        name: "粗糙度与剥离强度测试"
                      },
                      {
                        id: "materials-1-59",
                        name: "阻抗与TDR测试"
                      },
                      {
                        id: "materials-1-60",
                        name: "VNA插损回损测试"
                      },
                      {
                        id: "materials-1-61",
                        name: "CAF与热循环可靠性测试"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-1-62",
                name: "承载产品与重点应用",
                children: [
                  {
                    id: "materials-1-63",
                    name: "承载产品",
                    children: [
                      {
                        id: "materials-1-64",
                        name: "高速多层PCB与背板"
                      },
                      {
                        id: "materials-1-65",
                        name: "交换机与服务器主板"
                      },
                      {
                        id: "materials-1-66",
                        name: "光模块与高速连接板"
                      },
                      {
                        id: "materials-1-67",
                        name: "RF与毫米波天线板"
                      },
                      {
                        id: "materials-1-68",
                        name: "IC封装基板"
                      },
                      {
                        id: "materials-1-69",
                        name: "柔性与刚挠高速互连板"
                      }
                    ]
                  },
                  {
                    id: "materials-1-70",
                    name: "重点应用",
                    children: [
                      {
                        id: "materials-1-71",
                        name: "AI服务器与数据中心"
                      },
                      {
                        id: "materials-1-72",
                        name: "5G与6G通信设备"
                      },
                      {
                        id: "materials-1-73",
                        name: "汽车雷达与智能驾驶电子"
                      },
                      {
                        id: "materials-1-74",
                        name: "航空航天与国防电子"
                      },
                      {
                        id: "materials-1-75",
                        name: "工业测试与高端仪器"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "materials-2",
            name: "电子湿化学材料",
            children: [
              {
                id: "materials-2-1",
                name: "关键原料与支撑体系",
                children: [
                  {
                    id: "materials-2-2",
                    name: "基础化工原料",
                    children: [
                      {
                        id: "materials-2-3",
                        name: "硫酸"
                      },
                      {
                        id: "materials-2-4",
                        name: "硝酸"
                      },
                      {
                        id: "materials-2-5",
                        name: "盐酸"
                      },
                      {
                        id: "materials-2-6",
                        name: "氢氟酸"
                      },
                      {
                        id: "materials-2-7",
                        name: "磷酸"
                      },
                      {
                        id: "materials-2-8",
                        name: "过氧化氢"
                      },
                      {
                        id: "materials-2-9",
                        name: "氨水"
                      },
                      {
                        id: "materials-2-10",
                        name: "异丙醇"
                      },
                      {
                        id: "materials-2-11",
                        name: "醋酸与有机溶剂"
                      },
                      {
                        id: "materials-2-12",
                        name: "氟化铵与缓冲蚀刻体系原料"
                      }
                    ]
                  },
                  {
                    id: "materials-2-13",
                    name: "功能添加剂与配方组分",
                    children: [
                      {
                        id: "materials-2-14",
                        name: "表面活性剂"
                      },
                      {
                        id: "materials-2-15",
                        name: "络合剂"
                      },
                      {
                        id: "materials-2-16",
                        name: "缓蚀剂"
                      },
                      {
                        id: "materials-2-17",
                        name: "螯合剂"
                      },
                      {
                        id: "materials-2-18",
                        name: "pH 调节剂"
                      },
                      {
                        id: "materials-2-19",
                        name: "痕量金属控制组分"
                      }
                    ]
                  },
                  {
                    id: "materials-2-20",
                    name: "高纯配套材料与基础设施",
                    children: [
                      {
                        id: "materials-2-21",
                        name: "超纯水系统材料"
                      },
                      {
                        id: "materials-2-22",
                        name: "高纯过滤与离子交换材料"
                      },
                      {
                        id: "materials-2-23",
                        name: "PFA 与 PTFE 等高纯接液材料"
                      },
                      {
                        id: "materials-2-24",
                        name: "高纯包装容器与化学品输送系统"
                      },
                      {
                        id: "materials-2-25",
                        name: "在线监测与过程控制配套"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-2-26",
                name: "产品体系与制造工程",
                children: [
                  {
                    id: "materials-2-27",
                    name: "高纯单体湿化学品",
                    children: [
                      {
                        id: "materials-2-28",
                        name: "高纯酸类"
                      },
                      {
                        id: "materials-2-29",
                        name: "高纯碱类"
                      },
                      {
                        id: "materials-2-30",
                        name: "高纯氧化剂"
                      },
                      {
                        id: "materials-2-31",
                        name: "高纯溶剂类"
                      }
                    ]
                  },
                  {
                    id: "materials-2-32",
                    name: "配方型湿化学品",
                    children: [
                      {
                        id: "materials-2-33",
                        name: "RCA 与通用清洗液"
                      },
                      {
                        id: "materials-2-34",
                        name: "金属污染去除液"
                      },
                      {
                        id: "materials-2-35",
                        name: "氧化物与氮化物蚀刻液"
                      },
                      {
                        id: "materials-2-36",
                        name: "金属蚀刻液"
                      },
                      {
                        id: "materials-2-37",
                        name: "显影液与剥离液"
                      },
                      {
                        id: "materials-2-38",
                        name: "CMP 清洗液与后清洗液"
                      },
                      {
                        id: "materials-2-39",
                        name: "湿法沉积与电镀配套化学品"
                      }
                    ]
                  },
                  {
                    id: "materials-2-40",
                    name: "制造与质量控制",
                    children: [
                      {
                        id: "materials-2-41",
                        name: "原液合成与粗制备"
                      },
                      {
                        id: "materials-2-42",
                        name: "多级精馏与纯化"
                      },
                      {
                        id: "materials-2-43",
                        name: "离子交换与吸附净化"
                      },
                      {
                        id: "materials-2-44",
                        name: "痕量颗粒与有机杂质控制"
                      },
                      {
                        id: "materials-2-45",
                        name: "混配与在线循环供液"
                      },
                      {
                        id: "materials-2-46",
                        name: "超净过滤与无尘灌装"
                      },
                      {
                        id: "materials-2-47",
                        name: "分析检测与批次放行"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-2-48",
                name: "制程应用与客户场景",
                children: [
                  {
                    id: "materials-2-49",
                    name: "半导体晶圆制造",
                    children: [
                      {
                        id: "materials-2-50",
                        name: "晶圆前清洗"
                      },
                      {
                        id: "materials-2-51",
                        name: "湿法蚀刻"
                      },
                      {
                        id: "materials-2-52",
                        name: "光刻配套湿制程"
                      },
                      {
                        id: "materials-2-53",
                        name: "CMP 与后清洗"
                      },
                      {
                        id: "materials-2-54",
                        name: "先进封装湿制程"
                      }
                    ]
                  },
                  {
                    id: "materials-2-55",
                    name: "显示面板制造",
                    children: [
                      {
                        id: "materials-2-56",
                        name: "玻璃基板清洗"
                      },
                      {
                        id: "materials-2-57",
                        name: "TFT 与彩膜湿制程"
                      },
                      {
                        id: "materials-2-58",
                        name: "OLED 与 Micro LED 配套湿化学品"
                      }
                    ]
                  },
                  {
                    id: "materials-2-59",
                    name: "光伏与其他电子制造",
                    children: [
                      {
                        id: "materials-2-60",
                        name: "硅片制绒与清洗"
                      },
                      {
                        id: "materials-2-61",
                        name: "电池片蚀刻与去污"
                      },
                      {
                        id: "materials-2-62",
                        name: "LED 与化合物半导体清洗"
                      },
                      {
                        id: "materials-2-63",
                        name: "精密电子与玻璃基板清洗"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-2-64",
                name: "供应服务与循环治理",
                children: [
                  {
                    id: "materials-2-65",
                    name: "供应模式与现场服务",
                    children: [
                      {
                        id: "materials-2-66",
                        name: "桶装与槽车供货"
                      },
                      {
                        id: "materials-2-67",
                        name: "现场混配与补液"
                      },
                      {
                        id: "materials-2-68",
                        name: "Total Chemical Management"
                      },
                      {
                        id: "materials-2-69",
                        name: "Fab 就近建厂与联合保供"
                      }
                    ]
                  },
                  {
                    id: "materials-2-70",
                    name: "安全环保与循环利用",
                    children: [
                      {
                        id: "materials-2-71",
                        name: "废酸废溶剂回收再生"
                      },
                      {
                        id: "materials-2-72",
                        name: "废液分类与资源化"
                      },
                      {
                        id: "materials-2-73",
                        name: "危化品储运与泄漏控制"
                      },
                      {
                        id: "materials-2-74",
                        name: "EHS 与洁净室兼容管理"
                      }
                    ]
                  },
                  {
                    id: "materials-2-75",
                    name: "认证与产业协同",
                    children: [
                      {
                        id: "materials-2-76",
                        name: "客户导入与材料认证"
                      },
                      {
                        id: "materials-2-77",
                        name: "SEMI 与客户规范适配"
                      },
                      {
                        id: "materials-2-78",
                        name: "长协保供与产能共建"
                      },
                      {
                        id: "materials-2-79",
                        name: "本地化替代与供应链韧性"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "materials-3",
            name: "锂电正极材料",
            children: [
              {
                id: "materials-3-1",
                name: "资源与基础原料体系",
                children: [
                  {
                    id: "materials-3-2",
                    name: "锂资源与锂盐",
                    children: [
                      {
                        id: "materials-3-3",
                        name: "盐湖卤水提锂"
                      },
                      {
                        id: "materials-3-4",
                        name: "锂辉石提锂"
                      },
                      {
                        id: "materials-3-5",
                        name: "电池级碳酸锂"
                      },
                      {
                        id: "materials-3-6",
                        name: "电池级氢氧化锂"
                      }
                    ]
                  },
                  {
                    id: "materials-3-7",
                    name: "镍钴锰铝与铁磷基础化学品",
                    children: [
                      {
                        id: "materials-3-8",
                        name: "电解镍与镍中间品"
                      },
                      {
                        id: "materials-3-9",
                        name: "电解钴与钴盐"
                      },
                      {
                        id: "materials-3-10",
                        name: "电池级硫酸锰"
                      },
                      {
                        id: "materials-3-11",
                        name: "氢氧化铝与铝源"
                      },
                      {
                        id: "materials-3-12",
                        name: "工业磷酸与黄磷"
                      },
                      {
                        id: "materials-3-13",
                        name: "电池级磷酸"
                      },
                      {
                        id: "materials-3-14",
                        name: "铁源与铁盐"
                      }
                    ]
                  },
                  {
                    id: "materials-3-15",
                    name: "辅料与功能添加体系",
                    children: [
                      {
                        id: "materials-3-16",
                        name: "锂源补锂剂"
                      },
                      {
                        id: "materials-3-17",
                        name: "掺杂元素与微量添加剂"
                      },
                      {
                        id: "materials-3-18",
                        name: "表面包覆材料"
                      },
                      {
                        id: "materials-3-19",
                        name: "导电剂与分散介质"
                      }
                    ]
                  },
                  {
                    id: "materials-3-20",
                    name: "关键装备与公辅系统",
                    children: [
                      {
                        id: "materials-3-21",
                        name: "混合与反应装备"
                      },
                      {
                        id: "materials-3-22",
                        name: "过滤洗涤与干燥装备"
                      },
                      {
                        id: "materials-3-23",
                        name: "高温烧结装备"
                      },
                      {
                        id: "materials-3-24",
                        name: "粉体输送与包装装备"
                      },
                      {
                        id: "materials-3-25",
                        name: "尾气治理与三废处理系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-3-26",
                name: "中间体与正极材料制造体系",
                children: [
                  {
                    id: "materials-3-27",
                    name: "三元前驱体体系",
                    children: [
                      {
                        id: "materials-3-28",
                        name: "共沉淀前驱体"
                      },
                      {
                        id: "materials-3-29",
                        name: "高镍前驱体"
                      },
                      {
                        id: "materials-3-30",
                        name: "单晶前驱体"
                      },
                      {
                        id: "materials-3-31",
                        name: "前驱体洗涤与干燥"
                      }
                    ]
                  },
                  {
                    id: "materials-3-32",
                    name: "磷酸铁与锰铁中间体体系",
                    children: [
                      {
                        id: "materials-3-33",
                        name: "磷酸铁"
                      },
                      {
                        id: "materials-3-34",
                        name: "磷酸锰铁中间体"
                      },
                      {
                        id: "materials-3-35",
                        name: "铁磷复合前驱体"
                      }
                    ]
                  },
                  {
                    id: "materials-3-36",
                    name: "正极活性材料合成",
                    children: [
                      {
                        id: "materials-3-37",
                        name: "磷酸铁锂"
                      },
                      {
                        id: "materials-3-38",
                        name: "磷酸锰铁锂"
                      },
                      {
                        id: "materials-3-39",
                        name: "三元材料"
                      },
                      {
                        id: "materials-3-40",
                        name: "钴酸锂"
                      },
                      {
                        id: "materials-3-41",
                        name: "锰酸锂"
                      },
                      {
                        id: "materials-3-42",
                        name: "镍钴铝材料"
                      }
                    ]
                  },
                  {
                    id: "materials-3-43",
                    name: "后处理与性能优化",
                    children: [
                      {
                        id: "materials-3-44",
                        name: "掺杂改性"
                      },
                      {
                        id: "materials-3-45",
                        name: "包覆改性"
                      },
                      {
                        id: "materials-3-46",
                        name: "粒径级配控制"
                      },
                      {
                        id: "materials-3-47",
                        name: "混料与均化"
                      },
                      {
                        id: "materials-3-48",
                        name: "成品分级与包装"
                      }
                    ]
                  },
                  {
                    id: "materials-3-49",
                    name: "质量检测与工艺控制",
                    children: [
                      {
                        id: "materials-3-50",
                        name: "化学成分分析"
                      },
                      {
                        id: "materials-3-51",
                        name: "晶体结构表征"
                      },
                      {
                        id: "materials-3-52",
                        name: "粒度与比表面积检测"
                      },
                      {
                        id: "materials-3-53",
                        name: "电化学性能测试"
                      },
                      {
                        id: "materials-3-54",
                        name: "批次一致性控制"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-3-55",
                name: "产品体系与需求牵引",
                children: [
                  {
                    id: "materials-3-56",
                    name: "动力电池用正极材料",
                    children: [
                      {
                        id: "materials-3-57",
                        name: "乘用车"
                      },
                      {
                        id: "materials-3-58",
                        name: "商用车"
                      },
                      {
                        id: "materials-3-59",
                        name: "两轮车与特种车辆"
                      }
                    ]
                  },
                  {
                    id: "materials-3-60",
                    name: "储能电池用正极材料",
                    children: [
                      {
                        id: "materials-3-61",
                        name: "电网侧储能"
                      },
                      {
                        id: "materials-3-62",
                        name: "工商业储能"
                      },
                      {
                        id: "materials-3-63",
                        name: "户用储能"
                      }
                    ]
                  },
                  {
                    id: "materials-3-64",
                    name: "消费与工业电池用正极材料",
                    children: [
                      {
                        id: "materials-3-65",
                        name: "3C 电池"
                      },
                      {
                        id: "materials-3-66",
                        name: "电动工具"
                      },
                      {
                        id: "materials-3-67",
                        name: "无人机与机器人"
                      }
                    ]
                  },
                  {
                    id: "materials-3-68",
                    name: "认证导入与客户协同",
                    children: [
                      {
                        id: "materials-3-69",
                        name: "电芯厂导入验证"
                      },
                      {
                        id: "materials-3-70",
                        name: "模组与系统适配"
                      },
                      {
                        id: "materials-3-71",
                        name: "长周期供货认证"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-3-72",
                name: "循环利用与产业支撑",
                children: [
                  {
                    id: "materials-3-73",
                    name: "生产过程废料回收",
                    children: [
                      {
                        id: "materials-3-74",
                        name: "极片边角料回收"
                      },
                      {
                        id: "materials-3-75",
                        name: "不合格品回收"
                      },
                      {
                        id: "materials-3-76",
                        name: "含锂废粉回收"
                      }
                    ]
                  },
                  {
                    id: "materials-3-77",
                    name: "退役电池资源化",
                    children: [
                      {
                        id: "materials-3-78",
                        name: "拆解与预处理"
                      },
                      {
                        id: "materials-3-79",
                        name: "黑粉制备"
                      },
                      {
                        id: "materials-3-80",
                        name: "湿法冶金回收"
                      },
                      {
                        id: "materials-3-81",
                        name: "火法冶金回收"
                      }
                    ]
                  },
                  {
                    id: "materials-3-82",
                    name: "正极材料再生利用",
                    children: [
                      {
                        id: "materials-3-83",
                        name: "锂镍钴锰盐再制备"
                      },
                      {
                        id: "materials-3-84",
                        name: "再生前驱体"
                      },
                      {
                        id: "materials-3-85",
                        name: "再生正极材料"
                      },
                      {
                        id: "materials-3-86",
                        name: "闭环供应"
                      }
                    ]
                  },
                  {
                    id: "materials-3-87",
                    name: "配套服务与生态",
                    children: [
                      {
                        id: "materials-3-88",
                        name: "第三方检测认证"
                      },
                      {
                        id: "materials-3-89",
                        name: "工厂设计与工程服务"
                      },
                      {
                        id: "materials-3-90",
                        name: "安环与合规服务"
                      },
                      {
                        id: "materials-3-91",
                        name: "价格与贸易服务"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "materials-4",
            name: "锂电负极材料",
            children: [
              {
                id: "materials-4-1",
                name: "关键资源与前体体系",
                children: [
                  {
                    id: "materials-4-2",
                    name: "碳质资源与前驱体",
                    children: [
                      {
                        id: "materials-4-3",
                        name: "天然石墨"
                      },
                      {
                        id: "materials-4-4",
                        name: "石油焦"
                      },
                      {
                        id: "materials-4-5",
                        name: "针状焦"
                      },
                      {
                        id: "materials-4-6",
                        name: "煤沥青"
                      },
                      {
                        id: "materials-4-7",
                        name: "中间相碳微球"
                      }
                    ]
                  },
                  {
                    id: "materials-4-8",
                    name: "硅系与其他活性物质",
                    children: [
                      {
                        id: "materials-4-9",
                        name: "工业硅"
                      },
                      {
                        id: "materials-4-10",
                        name: "纳米硅"
                      },
                      {
                        id: "materials-4-11",
                        name: "氧化亚硅"
                      },
                      {
                        id: "materials-4-12",
                        name: "锡基负极材料"
                      },
                      {
                        id: "materials-4-13",
                        name: "钛基负极材料"
                      }
                    ]
                  },
                  {
                    id: "materials-4-14",
                    name: "辅材与工艺介质",
                    children: [
                      {
                        id: "materials-4-15",
                        name: "包覆碳源"
                      },
                      {
                        id: "materials-4-16",
                        name: "粘结剂与分散剂"
                      },
                      {
                        id: "materials-4-17",
                        name: "酸碱纯化试剂"
                      },
                      {
                        id: "materials-4-18",
                        name: "惰性气体与热工介质"
                      },
                      {
                        id: "materials-4-19",
                        name: "电力与蒸汽"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-4-20",
                name: "材料产品与制造工程",
                children: [
                  {
                    id: "materials-4-21",
                    name: "天然石墨负极材料",
                    children: [
                      {
                        id: "materials-4-22",
                        name: "选矿与提纯"
                      },
                      {
                        id: "materials-4-23",
                        name: "球形化与分级"
                      },
                      {
                        id: "materials-4-24",
                        name: "包覆改性"
                      },
                      {
                        id: "materials-4-25",
                        name: "成品整形"
                      }
                    ]
                  },
                  {
                    id: "materials-4-26",
                    name: "人造石墨负极材料",
                    children: [
                      {
                        id: "materials-4-27",
                        name: "原料预处理与造粒"
                      },
                      {
                        id: "materials-4-28",
                        name: "预碳化"
                      },
                      {
                        id: "materials-4-29",
                        name: "高温石墨化"
                      },
                      {
                        id: "materials-4-30",
                        name: "粉碎整形与筛分"
                      },
                      {
                        id: "materials-4-31",
                        name: "包覆复合与表面处理"
                      }
                    ]
                  },
                  {
                    id: "materials-4-32",
                    name: "硅基及复合负极材料",
                    children: [
                      {
                        id: "materials-4-33",
                        name: "硅氧材料制备"
                      },
                      {
                        id: "materials-4-34",
                        name: "纳米硅制备"
                      },
                      {
                        id: "materials-4-35",
                        name: "硅碳复合"
                      },
                      {
                        id: "materials-4-36",
                        name: "预锂化适配"
                      }
                    ]
                  },
                  {
                    id: "materials-4-37",
                    name: "检测与装备配套",
                    children: [
                      {
                        id: "materials-4-38",
                        name: "理化表征"
                      },
                      {
                        id: "materials-4-39",
                        name: "电化学测试"
                      },
                      {
                        id: "materials-4-40",
                        name: "热工装备"
                      },
                      {
                        id: "materials-4-41",
                        name: "粉体处理装备"
                      },
                      {
                        id: "materials-4-42",
                        name: "自动化与环保系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-4-43",
                name: "应用适配与市场牵引",
                children: [
                  {
                    id: "materials-4-44",
                    name: "动力电池应用",
                    children: [
                      {
                        id: "materials-4-45",
                        name: "乘用车电池"
                      },
                      {
                        id: "materials-4-46",
                        name: "商用车电池"
                      },
                      {
                        id: "materials-4-47",
                        name: "混动电池"
                      }
                    ]
                  },
                  {
                    id: "materials-4-48",
                    name: "储能电池应用",
                    children: [
                      {
                        id: "materials-4-49",
                        name: "电网侧储能"
                      },
                      {
                        id: "materials-4-50",
                        name: "工商业储能"
                      },
                      {
                        id: "materials-4-51",
                        name: "户用储能"
                      }
                    ]
                  },
                  {
                    id: "materials-4-52",
                    name: "消费与特种电池应用",
                    children: [
                      {
                        id: "materials-4-53",
                        name: "3C 电池"
                      },
                      {
                        id: "materials-4-54",
                        name: "电动工具与两轮车电池"
                      },
                      {
                        id: "materials-4-55",
                        name: "无人机与低空装备电池"
                      }
                    ]
                  },
                  {
                    id: "materials-4-56",
                    name: "性能导向",
                    children: [
                      {
                        id: "materials-4-57",
                        name: "高压实密度"
                      },
                      {
                        id: "materials-4-58",
                        name: "快充性能"
                      },
                      {
                        id: "materials-4-59",
                        name: "长循环寿命"
                      },
                      {
                        id: "materials-4-60",
                        name: "高安全性"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-4-61",
                name: "循环利用与产业支撑",
                children: [
                  {
                    id: "materials-4-62",
                    name: "回收再生",
                    children: [
                      {
                        id: "materials-4-63",
                        name: "废极片分离"
                      },
                      {
                        id: "materials-4-64",
                        name: "石墨再生修复"
                      },
                      {
                        id: "materials-4-65",
                        name: "硅基材料再利用"
                      },
                      {
                        id: "materials-4-66",
                        name: "黑粉分选与协同回收"
                      }
                    ]
                  },
                  {
                    id: "materials-4-67",
                    name: "标准检测与认证",
                    children: [
                      {
                        id: "materials-4-68",
                        name: "产品标准"
                      },
                      {
                        id: "materials-4-69",
                        name: "方法标准"
                      },
                      {
                        id: "materials-4-70",
                        name: "安全与环保规范"
                      },
                      {
                        id: "materials-4-71",
                        name: "碳足迹与溯源"
                      }
                    ]
                  },
                  {
                    id: "materials-4-72",
                    name: "产业组织要素",
                    children: [
                      {
                        id: "materials-4-73",
                        name: "资源保障与海外布局"
                      },
                      {
                        id: "materials-4-74",
                        name: "园区能源与公辅成本"
                      },
                      {
                        id: "materials-4-75",
                        name: "设备工程与产线集成"
                      },
                      {
                        id: "materials-4-76",
                        name: "资本投入与技术合作"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "materials-5",
            name: "锂电隔膜材料",
            children: [
              {
                id: "materials-5-1",
                name: "基础材料与功能体系",
                children: [
                  {
                    id: "materials-5-2",
                    name: "基膜树脂与关键单体",
                    children: [
                      {
                        id: "materials-5-3",
                        name: "聚乙烯"
                      },
                      {
                        id: "materials-5-4",
                        name: "聚丙烯"
                      },
                      {
                        id: "materials-5-5",
                        name: "超高分子量聚乙烯"
                      },
                      {
                        id: "materials-5-6",
                        name: "多层共挤聚烯烃体系"
                      }
                    ]
                  },
                  {
                    id: "materials-5-7",
                    name: "涂覆与复合材料",
                    children: [
                      {
                        id: "materials-5-8",
                        name: "氧化铝"
                      },
                      {
                        id: "materials-5-9",
                        name: "勃姆石"
                      },
                      {
                        id: "materials-5-10",
                        name: "二氧化硅及复合无机填料"
                      },
                      {
                        id: "materials-5-11",
                        name: "PVDF 与丙烯酸类粘结体系"
                      }
                    ]
                  },
                  {
                    id: "materials-5-12",
                    name: "辅材与工艺介质",
                    children: [
                      {
                        id: "materials-5-13",
                        name: "增塑剂与孔形成分"
                      },
                      {
                        id: "materials-5-14",
                        name: "溶剂与萃取介质"
                      },
                      {
                        id: "materials-5-15",
                        name: "分散剂与表面处理助剂"
                      },
                      {
                        id: "materials-5-16",
                        name: "功能添加剂与母粒"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-5-17",
                name: "制膜与过程工程",
                children: [
                  {
                    id: "materials-5-18",
                    name: "干法基膜制备",
                    children: [
                      {
                        id: "materials-5-19",
                        name: "单向拉伸成孔"
                      },
                      {
                        id: "materials-5-20",
                        name: "多层共挤与热闭孔结构"
                      }
                    ]
                  },
                  {
                    id: "materials-5-21",
                    name: "湿法基膜制备",
                    children: [
                      {
                        id: "materials-5-22",
                        name: "配混挤出"
                      },
                      {
                        id: "materials-5-23",
                        name: "相分离成孔"
                      },
                      {
                        id: "materials-5-24",
                        name: "双向拉伸"
                      },
                      {
                        id: "materials-5-25",
                        name: "萃取与干燥定型"
                      }
                    ]
                  },
                  {
                    id: "materials-5-26",
                    name: "涂覆与复合加工",
                    children: [
                      {
                        id: "materials-5-27",
                        name: "单面与双面陶瓷涂覆"
                      },
                      {
                        id: "materials-5-28",
                        name: "耐热层与粘结层复合"
                      },
                      {
                        id: "materials-5-29",
                        name: "纳米纤维与功能膜复合"
                      }
                    ]
                  },
                  {
                    id: "materials-5-30",
                    name: "分切与洁净制造",
                    children: [
                      {
                        id: "materials-5-31",
                        name: "分切收卷"
                      },
                      {
                        id: "materials-5-32",
                        name: "在线缺陷检测"
                      },
                      {
                        id: "materials-5-33",
                        name: "洁净环境控制"
                      },
                      {
                        id: "materials-5-34",
                        name: "溶剂回收与环保处理"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-5-35",
                name: "产品体系与验证应用",
                children: [
                  {
                    id: "materials-5-36",
                    name: "产品形态",
                    children: [
                      {
                        id: "materials-5-37",
                        name: "单层隔膜"
                      },
                      {
                        id: "materials-5-38",
                        name: "三层隔膜"
                      },
                      {
                        id: "materials-5-39",
                        name: "陶瓷涂覆隔膜"
                      },
                      {
                        id: "materials-5-40",
                        name: "复合功能隔膜"
                      }
                    ]
                  },
                  {
                    id: "materials-5-41",
                    name: "性能验证",
                    children: [
                      {
                        id: "materials-5-42",
                        name: "厚度与面密度"
                      },
                      {
                        id: "materials-5-43",
                        name: "孔径孔隙率与透气度"
                      },
                      {
                        id: "materials-5-44",
                        name: "润湿性与吸液率"
                      },
                      {
                        id: "materials-5-45",
                        name: "热收缩与热闭孔"
                      },
                      {
                        id: "materials-5-46",
                        name: "拉伸与穿刺强度"
                      }
                    ]
                  },
                  {
                    id: "materials-5-47",
                    name: "电芯适配",
                    children: [
                      {
                        id: "materials-5-48",
                        name: "动力电池"
                      },
                      {
                        id: "materials-5-49",
                        name: "储能电池"
                      },
                      {
                        id: "materials-5-50",
                        name: "消费电子电池"
                      },
                      {
                        id: "materials-5-51",
                        name: "钠离子与锂金属延伸应用"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-5-52",
                name: "循环利用与支撑体系",
                children: [
                  {
                    id: "materials-5-53",
                    name: "生产回收",
                    children: [
                      {
                        id: "materials-5-54",
                        name: "边角料回收"
                      },
                      {
                        id: "materials-5-55",
                        name: "涂层剥离与材料分离"
                      },
                      {
                        id: "materials-5-56",
                        name: "再生料回用"
                      }
                    ]
                  },
                  {
                    id: "materials-5-57",
                    name: "退役协同处理",
                    children: [
                      {
                        id: "materials-5-58",
                        name: "电池拆解协同分选"
                      },
                      {
                        id: "materials-5-59",
                        name: "与极片和电解液协同处理"
                      }
                    ]
                  },
                  {
                    id: "materials-5-60",
                    name: "设备与工程配套",
                    children: [
                      {
                        id: "materials-5-61",
                        name: "挤出拉伸设备"
                      },
                      {
                        id: "materials-5-62",
                        name: "涂布烘干设备"
                      },
                      {
                        id: "materials-5-63",
                        name: "萃取回收设备"
                      },
                      {
                        id: "materials-5-64",
                        name: "洁净厂务与环保系统"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "materials-6",
            name: "锂电电解液材料",
            children: [
              {
                id: "materials-6-1",
                name: "关键原料与材料体系",
                children: [
                  {
                    id: "materials-6-2",
                    name: "锂资源与基础锂化学品",
                    children: [
                      {
                        id: "materials-6-3",
                        name: "锂矿与盐湖资源"
                      },
                      {
                        id: "materials-6-4",
                        name: "电池级碳酸锂"
                      },
                      {
                        id: "materials-6-5",
                        name: "电池级氢氧化锂"
                      },
                      {
                        id: "materials-6-6",
                        name: "电池级氟化锂"
                      }
                    ]
                  },
                  {
                    id: "materials-6-7",
                    name: "含氟与含磷化学原料",
                    children: [
                      {
                        id: "materials-6-8",
                        name: "无水氢氟酸"
                      },
                      {
                        id: "materials-6-9",
                        name: "五氯化磷与相关磷化工中间体"
                      },
                      {
                        id: "materials-6-10",
                        name: "六氟磷酸体系前驱体"
                      }
                    ]
                  },
                  {
                    id: "materials-6-11",
                    name: "锂盐体系",
                    children: [
                      {
                        id: "materials-6-12",
                        name: "六氟磷酸锂"
                      },
                      {
                        id: "materials-6-13",
                        name: "双氟磺酰亚胺锂"
                      },
                      {
                        id: "materials-6-14",
                        name: "双三氟甲磺酰亚胺锂"
                      },
                      {
                        id: "materials-6-15",
                        name: "双草酸硼酸锂与复配锂盐"
                      }
                    ]
                  },
                  {
                    id: "materials-6-16",
                    name: "溶剂体系",
                    children: [
                      {
                        id: "materials-6-17",
                        name: "环状碳酸酯",
                        children: [
                          {
                            id: "materials-6-18",
                            name: "碳酸乙烯酯"
                          },
                          {
                            id: "materials-6-19",
                            name: "碳酸丙烯酯"
                          }
                        ]
                      },
                      {
                        id: "materials-6-20",
                        name: "线性碳酸酯",
                        children: [
                          {
                            id: "materials-6-21",
                            name: "碳酸二甲酯"
                          },
                          {
                            id: "materials-6-22",
                            name: "碳酸二乙酯"
                          },
                          {
                            id: "materials-6-23",
                            name: "碳酸甲乙酯"
                          }
                        ]
                      },
                      {
                        id: "materials-6-24",
                        name: "醚类与含氟溶剂"
                      },
                      {
                        id: "materials-6-25",
                        name: "离子液体与其他新型介质"
                      }
                    ]
                  },
                  {
                    id: "materials-6-26",
                    name: "添加剂体系",
                    children: [
                      {
                        id: "materials-6-27",
                        name: "成膜添加剂"
                      },
                      {
                        id: "materials-6-28",
                        name: "高电压稳定添加剂"
                      },
                      {
                        id: "materials-6-29",
                        name: "快充与宽温域添加剂"
                      },
                      {
                        id: "materials-6-30",
                        name: "阻燃与安全添加剂"
                      },
                      {
                        id: "materials-6-31",
                        name: "硅基负极适配添加剂"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-6-32",
                name: "制造与质量控制",
                children: [
                  {
                    id: "materials-6-33",
                    name: "关键材料合成与精制",
                    children: [
                      {
                        id: "materials-6-34",
                        name: "锂盐合成与纯化"
                      },
                      {
                        id: "materials-6-35",
                        name: "溶剂合成与精制"
                      },
                      {
                        id: "materials-6-36",
                        name: "添加剂合成与筛选"
                      }
                    ]
                  },
                  {
                    id: "materials-6-37",
                    name: "配方设计与复配制造",
                    children: [
                      {
                        id: "materials-6-38",
                        name: "基础配方开发"
                      },
                      {
                        id: "materials-6-39",
                        name: "高压快充低温配方开发"
                      },
                      {
                        id: "materials-6-40",
                        name: "双盐高浓局部高浓体系"
                      },
                      {
                        id: "materials-6-41",
                        name: "混配过滤与洁净灌装"
                      }
                    ]
                  },
                  {
                    id: "materials-6-42",
                    name: "工艺装备与工程控制",
                    children: [
                      {
                        id: "materials-6-43",
                        name: "无水无氧环境控制"
                      },
                      {
                        id: "materials-6-44",
                        name: "溶剂回收与尾气处理"
                      },
                      {
                        id: "materials-6-45",
                        name: "在线计量与批次追溯"
                      }
                    ]
                  },
                  {
                    id: "materials-6-46",
                    name: "检测表征与验证",
                    children: [
                      {
                        id: "materials-6-47",
                        name: "水分酸值与金属杂质检测"
                      },
                      {
                        id: "materials-6-48",
                        name: "电导率黏度与闪点测试"
                      },
                      {
                        id: "materials-6-49",
                        name: "电化学窗口与界面成膜表征"
                      },
                      {
                        id: "materials-6-50",
                        name: "循环寿命快充低温与安全验证"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-6-51",
                name: "产品体系与需求牵引",
                children: [
                  {
                    id: "materials-6-52",
                    name: "商业化液态电解液",
                    children: [
                      {
                        id: "materials-6-53",
                        name: "动力电池电解液"
                      },
                      {
                        id: "materials-6-54",
                        name: "储能电池电解液"
                      },
                      {
                        id: "materials-6-55",
                        name: "消费电子与小动力电解液"
                      }
                    ]
                  },
                  {
                    id: "materials-6-56",
                    name: "功能型电解液",
                    children: [
                      {
                        id: "materials-6-57",
                        name: "高镍高电压适配电解液"
                      },
                      {
                        id: "materials-6-58",
                        name: "磷酸铁锂与锰铁锂适配电解液"
                      },
                      {
                        id: "materials-6-59",
                        name: "硅基负极适配电解液"
                      },
                      {
                        id: "materials-6-60",
                        name: "快充与宽温域电解液"
                      }
                    ]
                  },
                  {
                    id: "materials-6-61",
                    name: "新形态电解质",
                    children: [
                      {
                        id: "materials-6-62",
                        name: "凝胶聚合物电解质"
                      },
                      {
                        id: "materials-6-63",
                        name: "半固态电解质"
                      },
                      {
                        id: "materials-6-64",
                        name: "固态电解质"
                      }
                    ]
                  },
                  {
                    id: "materials-6-65",
                    name: "下游客户与应用系统",
                    children: [
                      {
                        id: "materials-6-66",
                        name: "电芯制造企业"
                      },
                      {
                        id: "materials-6-67",
                        name: "车用动力系统"
                      },
                      {
                        id: "materials-6-68",
                        name: "储能系统"
                      },
                      {
                        id: "materials-6-69",
                        name: "消费电子与工业工具"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-6-70",
                name: "循环利用与前沿演进",
                children: [
                  {
                    id: "materials-6-71",
                    name: "退役电池电解液回收",
                    children: [
                      {
                        id: "materials-6-72",
                        name: "有机溶剂回收"
                      },
                      {
                        id: "materials-6-73",
                        name: "锂与含氟含磷组分回收"
                      },
                      {
                        id: "materials-6-74",
                        name: "无害化处理"
                      }
                    ]
                  },
                  {
                    id: "materials-6-75",
                    name: "安全环保与产业配套",
                    children: [
                      {
                        id: "materials-6-76",
                        name: "危化品储运"
                      },
                      {
                        id: "materials-6-77",
                        name: "环保治理"
                      },
                      {
                        id: "materials-6-78",
                        name: "标准认证与客户审核"
                      }
                    ]
                  },
                  {
                    id: "materials-6-79",
                    name: "前沿技术路线",
                    children: [
                      {
                        id: "materials-6-80",
                        name: "高浓与局部高浓电解液"
                      },
                      {
                        id: "materials-6-81",
                        name: "无氟低氟与阻燃体系"
                      },
                      {
                        id: "materials-6-82",
                        name: "锂金属负极适配电解液"
                      },
                      {
                        id: "materials-6-83",
                        name: "全固态界面电解质材料"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "materials-7",
            name: "药用辅料及包装材料",
            children: [
              {
                id: "materials-7-1",
                name: "基础原料与功能材料",
                children: [
                  {
                    id: "materials-7-2",
                    name: "药用辅料原料",
                    children: [
                      {
                        id: "materials-7-3",
                        name: "天然多糖与纤维素原料"
                      },
                      {
                        id: "materials-7-4",
                        name: "糖醇与有机酸盐原料"
                      },
                      {
                        id: "materials-7-5",
                        name: "合成高分子与表面活性剂原料"
                      },
                      {
                        id: "materials-7-6",
                        name: "脂质与磷脂原料"
                      },
                      {
                        id: "materials-7-7",
                        name: "无机盐与矿物功能原料"
                      }
                    ]
                  },
                  {
                    id: "materials-7-8",
                    name: "药包材原材料",
                    children: [
                      {
                        id: "materials-7-9",
                        name: "药用玻璃料"
                      },
                      {
                        id: "materials-7-10",
                        name: "药用树脂与高阻隔聚合物"
                      },
                      {
                        id: "materials-7-11",
                        name: "药用弹性体与橡胶基材"
                      },
                      {
                        id: "materials-7-12",
                        name: "铝材与金属薄材"
                      },
                      {
                        id: "materials-7-13",
                        name: "纸基材料与标签油墨胶黏剂"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-7-14",
                name: "辅料与包材产品体系",
                children: [
                  {
                    id: "materials-7-15",
                    name: "药用辅料",
                    children: [
                      {
                        id: "materials-7-16",
                        name: "稀释填充辅料"
                      },
                      {
                        id: "materials-7-17",
                        name: "黏合与成粒辅料"
                      },
                      {
                        id: "materials-7-18",
                        name: "崩解与助流润滑辅料"
                      },
                      {
                        id: "materials-7-19",
                        name: "包衣与成膜辅料"
                      },
                      {
                        id: "materials-7-20",
                        name: "增溶乳化与稳态调节辅料"
                      },
                      {
                        id: "materials-7-21",
                        name: "缓控释与递送功能辅料"
                      },
                      {
                        id: "materials-7-22",
                        name: "防腐抗氧与矫味着色辅料"
                      }
                    ]
                  },
                  {
                    id: "materials-7-23",
                    name: "药包材",
                    children: [
                      {
                        id: "materials-7-24",
                        name: "玻璃容器系统"
                      },
                      {
                        id: "materials-7-25",
                        name: "塑料容器与薄膜系统"
                      },
                      {
                        id: "materials-7-26",
                        name: "弹性体密封系统"
                      },
                      {
                        id: "materials-7-27",
                        name: "金属容器与铝塑复合系统"
                      },
                      {
                        id: "materials-7-28",
                        name: "预灌封与给药包装一体化系统"
                      },
                      {
                        id: "materials-7-29",
                        name: "标签说明书与防伪追溯材料"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-7-30",
                name: "制造转化与系统集成",
                children: [
                  {
                    id: "materials-7-31",
                    name: "药用辅料制造",
                    children: [
                      {
                        id: "materials-7-32",
                        name: "提取纯化"
                      },
                      {
                        id: "materials-7-33",
                        name: "化学合成与改性"
                      },
                      {
                        id: "materials-7-34",
                        name: "共处理与复配"
                      },
                      {
                        id: "materials-7-35",
                        name: "干燥造粒与微粉化"
                      }
                    ]
                  },
                  {
                    id: "materials-7-36",
                    name: "药包材制造",
                    children: [
                      {
                        id: "materials-7-37",
                        name: "玻璃熔制与成型"
                      },
                      {
                        id: "materials-7-38",
                        name: "注塑吹塑与挤出复合"
                      },
                      {
                        id: "materials-7-39",
                        name: "橡胶炼制与硫化成型"
                      },
                      {
                        id: "materials-7-40",
                        name: "涂布印刷与表面处理"
                      },
                      {
                        id: "materials-7-41",
                        name: "清洗灭菌与洁净装配"
                      }
                    ]
                  },
                  {
                    id: "materials-7-42",
                    name: "包装系统集成",
                    children: [
                      {
                        id: "materials-7-43",
                        name: "容器闭合系统配套"
                      },
                      {
                        id: "materials-7-44",
                        name: "灌装线适配与验证"
                      },
                      {
                        id: "materials-7-45",
                        name: "冷链与运输包装协同"
                      }
                    ]
                  }
                ]
              },
              {
                id: "materials-7-46",
                name: "质量评价与应用适配",
                children: [
                  {
                    id: "materials-7-47",
                    name: "研发筛选与制剂适配",
                    children: [
                      {
                        id: "materials-7-48",
                        name: "口服固体制剂适配"
                      },
                      {
                        id: "materials-7-49",
                        name: "注射剂与生物制品适配"
                      },
                      {
                        id: "materials-7-50",
                        name: "吸入制剂适配"
                      },
                      {
                        id: "materials-7-51",
                        name: "眼用鼻用与经皮制剂适配"
                      }
                    ]
                  },
                  {
                    id: "materials-7-52",
                    name: "质量控制与合规体系",
                    children: [
                      {
                        id: "materials-7-53",
                        name: "药典标准与企业内控"
                      },
                      {
                        id: "materials-7-54",
                        name: "相容性与安全性研究"
                      },
                      {
                        id: "materials-7-55",
                        name: "提取物浸出物研究"
                      },
                      {
                        id: "materials-7-56",
                        name: "容器密封完整性研究"
                      },
                      {
                        id: "materials-7-57",
                        name: "稳定性与变更管理"
                      },
                      {
                        id: "materials-7-58",
                        name: "关联审评与登记申报"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  capitalgoods: {
    upstream: {
      label: "上游",
      root: {
        id: "capitalgoods-upstream",
        name: "航空航天与国防",
        children: [
          {
            id: "capitalgoods-8",
            name: "雷达及配套设备",
            children: [
              {
                id: "capitalgoods-8-1",
                name: "关键材料与电子底座",
                children: [
                  {
                    id: "capitalgoods-8-2",
                    name: "半导体与微波器件",
                    children: [
                      {
                        id: "capitalgoods-8-3",
                        name: "GaN、GaAs 功率器件"
                      },
                      {
                        id: "capitalgoods-8-4",
                        name: "SiGe、CMOS、RFCMOS 射频收发芯片"
                      },
                      {
                        id: "capitalgoods-8-5",
                        name: "低噪声放大器、开关、移相器、衰减器"
                      },
                      {
                        id: "capitalgoods-8-6",
                        name: "ADC、DAC、时钟与高速数据转换芯片"
                      },
                      {
                        id: "capitalgoods-8-7",
                        name: "FPGA、SoC、DSP、GPU 与嵌入式控制芯片"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-8-8",
                    name: "结构材料与封装互连",
                    children: [
                      {
                        id: "capitalgoods-8-9",
                        name: "高频高速覆铜板与 PTFE、陶瓷介质材料"
                      },
                      {
                        id: "capitalgoods-8-10",
                        name: "LTCC、HTCC、先进封装与共封装互连"
                      },
                      {
                        id: "capitalgoods-8-11",
                        name: "热界面材料、散热器件与液冷风冷部件"
                      },
                      {
                        id: "capitalgoods-8-12",
                        name: "连接器、线缆、波导与电源部件"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-8-13",
                    name: "天线与罩体材料",
                    children: [
                      {
                        id: "capitalgoods-8-14",
                        name: "阵列天线单元材料"
                      },
                      {
                        id: "capitalgoods-8-15",
                        name: "透波材料与雷达罩"
                      },
                      {
                        id: "capitalgoods-8-16",
                        name: "吸波材料与电磁兼容材料"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-8-17",
                name: "核心分系统与配套装备",
                children: [
                  {
                    id: "capitalgoods-8-18",
                    name: "发射接收与频率链路",
                    children: [
                      {
                        id: "capitalgoods-8-19",
                        name: "功率放大与低噪接收链路"
                      },
                      {
                        id: "capitalgoods-8-20",
                        name: "频率综合、本振、上变频与下变频"
                      },
                      {
                        id: "capitalgoods-8-21",
                        name: "T/R 组件与前端模组"
                      },
                      {
                        id: "capitalgoods-8-22",
                        name: "波形产生、同步授时与时频管理"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-8-23",
                    name: "天线阵面与机电机构",
                    children: [
                      {
                        id: "capitalgoods-8-24",
                        name: "机械扫描天线"
                      },
                      {
                        id: "capitalgoods-8-25",
                        name: "有源相控阵阵面"
                      },
                      {
                        id: "capitalgoods-8-26",
                        name: "模拟、混合与数字波束形成"
                      },
                      {
                        id: "capitalgoods-8-27",
                        name: "伺服转台、稳定平台与升降桅杆"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-8-28",
                    name: "信号处理与控制系统",
                    children: [
                      {
                        id: "capitalgoods-8-29",
                        name: "中频与基带处理板卡"
                      },
                      {
                        id: "capitalgoods-8-30",
                        name: "目标检测、跟踪、成像与识别算法"
                      },
                      {
                        id: "capitalgoods-8-31",
                        name: "波束控制、资源调度与软件平台"
                      },
                      {
                        id: "capitalgoods-8-32",
                        name: "显控终端、接口通信与数据记录"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-8-33",
                    name: "测试校准与保障装备",
                    children: [
                      {
                        id: "capitalgoods-8-34",
                        name: "雷达目标模拟器与场景仿真系统"
                      },
                      {
                        id: "capitalgoods-8-35",
                        name: "暗室、OTA 测试与天线近远场测试系统"
                      },
                      {
                        id: "capitalgoods-8-36",
                        name: "环境试验、可靠性与电磁兼容测试设备"
                      },
                      {
                        id: "capitalgoods-8-37",
                        name: "标校工具、备件、培训与维修保障设备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-8-38",
                name: "产品体系与系统集成",
                children: [
                  {
                    id: "capitalgoods-8-39",
                    name: "防务雷达",
                    children: [
                      {
                        id: "capitalgoods-8-40",
                        name: "预警监视雷达"
                      },
                      {
                        id: "capitalgoods-8-41",
                        name: "火控制导与目标指示雷达"
                      },
                      {
                        id: "capitalgoods-8-42",
                        name: "反炮兵、反迫击炮与反无人机雷达"
                      },
                      {
                        id: "capitalgoods-8-43",
                        name: "舰载、机载、星载与岸基雷达"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-8-44",
                    name: "民用与行业雷达",
                    children: [
                      {
                        id: "capitalgoods-8-45",
                        name: "空管一次监视雷达与二次监视雷达"
                      },
                      {
                        id: "capitalgoods-8-46",
                        name: "气象雷达与水文监测雷达"
                      },
                      {
                        id: "capitalgoods-8-47",
                        name: "海事导航与岸基监视雷达"
                      },
                      {
                        id: "capitalgoods-8-48",
                        name: "汽车毫米波雷达与工业感知雷达"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-8-49",
                    name: "系统集成与工程交付",
                    children: [
                      {
                        id: "capitalgoods-8-50",
                        name: "指挥控制与多源数据融合系统"
                      },
                      {
                        id: "capitalgoods-8-51",
                        name: "供电、热管理与机动平台集成"
                      },
                      {
                        id: "capitalgoods-8-52",
                        name: "通信链路、数据链与网络安全系统"
                      },
                      {
                        id: "capitalgoods-8-53",
                        name: "工程安装、调试验收与寿命周期升级"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-8-54",
                name: "应用场景与运行保障",
                children: [
                  {
                    id: "capitalgoods-8-55",
                    name: "重点应用场景",
                    children: [
                      {
                        id: "capitalgoods-8-56",
                        name: "国土防空与边海空域监视"
                      },
                      {
                        id: "capitalgoods-8-57",
                        name: "机场空管、低空感知与空域安全"
                      },
                      {
                        id: "capitalgoods-8-58",
                        name: "灾害天气预警、水文监测与应急管理"
                      },
                      {
                        id: "capitalgoods-8-59",
                        name: "智能驾驶、工业安全与智慧交通"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-8-60",
                    name: "运维与服务生态",
                    children: [
                      {
                        id: "capitalgoods-8-61",
                        name: "状态监测与预测性维护"
                      },
                      {
                        id: "capitalgoods-8-62",
                        name: "软件升级与算法迭代服务"
                      },
                      {
                        id: "capitalgoods-8-63",
                        name: "第三方检测与认证服务"
                      },
                      {
                        id: "capitalgoods-8-64",
                        name: "备件保障与全寿命周期服务"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "capitalgoods-9",
            name: "智能无人飞行器",
            children: [
              {
                id: "capitalgoods-9-1",
                name: "核心要素与基础能力",
                children: [
                  {
                    id: "capitalgoods-9-2",
                    name: "平台总体与构型体系",
                    children: [
                      {
                        id: "capitalgoods-9-3",
                        name: "多旋翼平台"
                      },
                      {
                        id: "capitalgoods-9-4",
                        name: "固定翼平台"
                      },
                      {
                        id: "capitalgoods-9-5",
                        name: "复合翼与垂直起降平台"
                      },
                      {
                        id: "capitalgoods-9-6",
                        name: "无人直升机平台"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-9-7",
                    name: "关键部件与机载系统",
                    children: [
                      {
                        id: "capitalgoods-9-8",
                        name: "飞控系统"
                      },
                      {
                        id: "capitalgoods-9-9",
                        name: "任务计算与机载智能"
                      },
                      {
                        id: "capitalgoods-9-10",
                        name: "动力推进系统"
                      },
                      {
                        id: "capitalgoods-9-11",
                        name: "能源与电源管理系统"
                      },
                      {
                        id: "capitalgoods-9-12",
                        name: "通信链路与数据链系统"
                      },
                      {
                        id: "capitalgoods-9-13",
                        name: "导航定位系统"
                      },
                      {
                        id: "capitalgoods-9-14",
                        name: "感知避障系统"
                      },
                      {
                        id: "capitalgoods-9-15",
                        name: "机体结构与机电部件"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-9-16",
                    name: "任务载荷与地面配套",
                    children: [
                      {
                        id: "capitalgoods-9-17",
                        name: "光电吊舱与云台相机"
                      },
                      {
                        id: "capitalgoods-9-18",
                        name: "红外热成像载荷"
                      },
                      {
                        id: "capitalgoods-9-19",
                        name: "多光谱与高光谱载荷"
                      },
                      {
                        id: "capitalgoods-9-20",
                        name: "激光雷达与测绘载荷"
                      },
                      {
                        id: "capitalgoods-9-21",
                        name: "喷洒播撒与作业载荷"
                      },
                      {
                        id: "capitalgoods-9-22",
                        name: "物流投送与吊运载荷"
                      },
                      {
                        id: "capitalgoods-9-23",
                        name: "地面站与遥控终端"
                      },
                      {
                        id: "capitalgoods-9-24",
                        name: "自动机库与充换电设施"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-9-25",
                name: "研发制造与测试验证",
                children: [
                  {
                    id: "capitalgoods-9-26",
                    name: "设计开发与仿真",
                    children: [
                      {
                        id: "capitalgoods-9-27",
                        name: "总体方案设计"
                      },
                      {
                        id: "capitalgoods-9-28",
                        name: "气动与结构设计"
                      },
                      {
                        id: "capitalgoods-9-29",
                        name: "飞控算法开发"
                      },
                      {
                        id: "capitalgoods-9-30",
                        name: "任务系统集成开发"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-9-31",
                    name: "制造装配与产线工程",
                    children: [
                      {
                        id: "capitalgoods-9-32",
                        name: "机体制造"
                      },
                      {
                        id: "capitalgoods-9-33",
                        name: "复合材料成型"
                      },
                      {
                        id: "capitalgoods-9-34",
                        name: "电装与线束集成"
                      },
                      {
                        id: "capitalgoods-9-35",
                        name: "总装与联调"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-9-36",
                    name: "测试验证与质量保障",
                    children: [
                      {
                        id: "capitalgoods-9-37",
                        name: "标定与功能测试"
                      },
                      {
                        id: "capitalgoods-9-38",
                        name: "环境与可靠性试验"
                      },
                      {
                        id: "capitalgoods-9-39",
                        name: "飞行测试与场景验证"
                      },
                      {
                        id: "capitalgoods-9-40",
                        name: "适航与合规验证"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-9-41",
                name: "运行体系与数字空域",
                children: [
                  {
                    id: "capitalgoods-9-42",
                    name: "飞行运行与机队管理",
                    children: [
                      {
                        id: "capitalgoods-9-43",
                        name: "任务规划"
                      },
                      {
                        id: "capitalgoods-9-44",
                        name: "航线调度"
                      },
                      {
                        id: "capitalgoods-9-45",
                        name: "机队运控平台"
                      },
                      {
                        id: "capitalgoods-9-46",
                        name: "远程运维系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-9-47",
                    name: "低空通信导航与监管协同",
                    children: [
                      {
                        id: "capitalgoods-9-48",
                        name: "GNSS 与 RTK 增强服务"
                      },
                      {
                        id: "capitalgoods-9-49",
                        name: "北斗与组合导航服务"
                      },
                      {
                        id: "capitalgoods-9-50",
                        name: "5G 专网与卫星通信"
                      },
                      {
                        id: "capitalgoods-9-51",
                        name: "Remote ID 与网络识别"
                      },
                      {
                        id: "capitalgoods-9-52",
                        name: "UTM 与 U-space 服务"
                      },
                      {
                        id: "capitalgoods-9-53",
                        name: "飞行监管平台对接"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-9-54",
                    name: "维修保障与安全服务",
                    children: [
                      {
                        id: "capitalgoods-9-55",
                        name: "维修维保服务"
                      },
                      {
                        id: "capitalgoods-9-56",
                        name: "培训取证服务"
                      },
                      {
                        id: "capitalgoods-9-57",
                        name: "保险与风险管理服务"
                      },
                      {
                        id: "capitalgoods-9-58",
                        name: "数据安全与网络安全服务"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-9-59",
                name: "应用场景与产业生态",
                children: [
                  {
                    id: "capitalgoods-9-60",
                    name: "行业作业应用",
                    children: [
                      {
                        id: "capitalgoods-9-61",
                        name: "电力与能源巡检"
                      },
                      {
                        id: "capitalgoods-9-62",
                        name: "自然资源与测绘遥感"
                      },
                      {
                        id: "capitalgoods-9-63",
                        name: "农林植保与农情监测"
                      },
                      {
                        id: "capitalgoods-9-64",
                        name: "水利环保与生态监测"
                      },
                      {
                        id: "capitalgoods-9-65",
                        name: "应急救援与消防安防"
                      },
                      {
                        id: "capitalgoods-9-66",
                        name: "海事港口与交通巡查"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-9-67",
                    name: "物流配送与公共服务",
                    children: [
                      {
                        id: "capitalgoods-9-68",
                        name: "医疗与应急配送"
                      },
                      {
                        id: "capitalgoods-9-69",
                        name: "园区与末端配送"
                      },
                      {
                        id: "capitalgoods-9-70",
                        name: "城市治理与公共巡查"
                      },
                      {
                        id: "capitalgoods-9-71",
                        name: "低空基础设施巡检"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-9-72",
                    name: "产业服务与数据延伸",
                    children: [
                      {
                        id: "capitalgoods-9-73",
                        name: "数据处理与智能分析"
                      },
                      {
                        id: "capitalgoods-9-74",
                        name: "行业解决方案集成"
                      },
                      {
                        id: "capitalgoods-9-75",
                        name: "租赁托管与代运营"
                      },
                      {
                        id: "capitalgoods-9-76",
                        name: "消费级影像与内容服务"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "capitalgoods-10",
            name: "商业卫星制造",
            children: [
              {
                id: "capitalgoods-10-1",
                name: "基础材料与关键器件",
                children: [
                  {
                    id: "capitalgoods-10-2",
                    name: "结构与机构件",
                    children: [
                      {
                        id: "capitalgoods-10-3",
                        name: "主承力结构件"
                      },
                      {
                        id: "capitalgoods-10-4",
                        name: "轻量化舱体与面板"
                      },
                      {
                        id: "capitalgoods-10-5",
                        name: "部署机构与分离机构"
                      },
                      {
                        id: "capitalgoods-10-6",
                        name: "热控材料与表面处理"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-10-7",
                    name: "能源与热控器件",
                    children: [
                      {
                        id: "capitalgoods-10-8",
                        name: "太阳电池与太阳翼驱动机构"
                      },
                      {
                        id: "capitalgoods-10-9",
                        name: "蓄电池与电源调节单元"
                      },
                      {
                        id: "capitalgoods-10-10",
                        name: "热管与散热器"
                      },
                      {
                        id: "capitalgoods-10-11",
                        name: "热控涂层与多层隔热组件"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-10-12",
                    name: "姿轨控与推进器件",
                    children: [
                      {
                        id: "capitalgoods-10-13",
                        name: "星敏感器与惯性测量器件"
                      },
                      {
                        id: "capitalgoods-10-14",
                        name: "太阳敏感器与磁场测量器件"
                      },
                      {
                        id: "capitalgoods-10-15",
                        name: "反作用轮与磁力矩器"
                      },
                      {
                        id: "capitalgoods-10-16",
                        name: "化学推进器与电推进器"
                      },
                      {
                        id: "capitalgoods-10-17",
                        name: "贮箱阀门与流体管路组件"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-10-18",
                    name: "航电与数传器件",
                    children: [
                      {
                        id: "capitalgoods-10-19",
                        name: "星载计算机与存储单元"
                      },
                      {
                        id: "capitalgoods-10-20",
                        name: "电源分配与接口板卡"
                      },
                      {
                        id: "capitalgoods-10-21",
                        name: "测控收发机与频率源"
                      },
                      {
                        id: "capitalgoods-10-22",
                        name: "放大器与射频前端"
                      },
                      {
                        id: "capitalgoods-10-23",
                        name: "天线馈源与开关网络"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-10-24",
                    name: "载荷核心器件",
                    children: [
                      {
                        id: "capitalgoods-10-25",
                        name: "通信载荷数字处理单元"
                      },
                      {
                        id: "capitalgoods-10-26",
                        name: "相控阵与有源天线单元"
                      },
                      {
                        id: "capitalgoods-10-27",
                        name: "光学镜头与焦平面探测器"
                      },
                      {
                        id: "capitalgoods-10-28",
                        name: "SAR 发射接收组件"
                      },
                      {
                        id: "capitalgoods-10-29",
                        name: "AIS ADS-B 物联网专用载荷模块"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-10-30",
                name: "卫星平台与载荷制造",
                children: [
                  {
                    id: "capitalgoods-10-31",
                    name: "商业卫星平台产品",
                    children: [
                      {
                        id: "capitalgoods-10-32",
                        name: "立方星平台"
                      },
                      {
                        id: "capitalgoods-10-33",
                        name: "小卫星平台"
                      },
                      {
                        id: "capitalgoods-10-34",
                        name: "中型商业卫星平台"
                      },
                      {
                        id: "capitalgoods-10-35",
                        name: "GEO 通信卫星平台"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-10-36",
                    name: "平台分系统制造",
                    children: [
                      {
                        id: "capitalgoods-10-37",
                        name: "电源分系统"
                      },
                      {
                        id: "capitalgoods-10-38",
                        name: "推进分系统"
                      },
                      {
                        id: "capitalgoods-10-39",
                        name: "姿态与轨道控制分系统"
                      },
                      {
                        id: "capitalgoods-10-40",
                        name: "航电与数据管理分系统"
                      },
                      {
                        id: "capitalgoods-10-41",
                        name: "测控通信分系统"
                      },
                      {
                        id: "capitalgoods-10-42",
                        name: "结构与热控分系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-10-43",
                    name: "任务载荷制造",
                    children: [
                      {
                        id: "capitalgoods-10-44",
                        name: "通信载荷"
                      },
                      {
                        id: "capitalgoods-10-45",
                        name: "光学遥感载荷"
                      },
                      {
                        id: "capitalgoods-10-46",
                        name: "SAR 载荷"
                      },
                      {
                        id: "capitalgoods-10-47",
                        name: "导航增强载荷"
                      },
                      {
                        id: "capitalgoods-10-48",
                        name: "海事航空监视与物联网载荷"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-10-49",
                    name: "软件定义与数字化能力",
                    children: [
                      {
                        id: "capitalgoods-10-50",
                        name: "软件定义载荷"
                      },
                      {
                        id: "capitalgoods-10-51",
                        name: "数字信号处理与交换"
                      },
                      {
                        id: "capitalgoods-10-52",
                        name: "星间链路与网络化能力"
                      },
                      {
                        id: "capitalgoods-10-53",
                        name: "在轨重构与软件升级能力"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-10-54",
                name: "总装测试与发射交付",
                children: [
                  {
                    id: "capitalgoods-10-55",
                    name: "单机装调与系统集成",
                    children: [
                      {
                        id: "capitalgoods-10-56",
                        name: "关键单机装配与互连"
                      },
                      {
                        id: "capitalgoods-10-57",
                        name: "星上总装与电缆集成"
                      },
                      {
                        id: "capitalgoods-10-58",
                        name: "载荷平台一体化联调"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-10-59",
                    name: "环境与可靠性验证",
                    children: [
                      {
                        id: "capitalgoods-10-60",
                        name: "振动与冲击试验"
                      },
                      {
                        id: "capitalgoods-10-61",
                        name: "热真空与热循环试验"
                      },
                      {
                        id: "capitalgoods-10-62",
                        name: "EMC 电磁兼容试验"
                      },
                      {
                        id: "capitalgoods-10-63",
                        name: "辐照与寿命评估"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-10-64",
                    name: "发射接口与交付",
                    children: [
                      {
                        id: "capitalgoods-10-65",
                        name: "分离装置与适配器"
                      },
                      {
                        id: "capitalgoods-10-66",
                        name: "专属发射适配"
                      },
                      {
                        id: "capitalgoods-10-67",
                        name: "共享发射适配"
                      },
                      {
                        id: "capitalgoods-10-68",
                        name: "轨道转移与最后一公里入轨"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-10-69",
                    name: "在轨验收与寿命保障",
                    children: [
                      {
                        id: "capitalgoods-10-70",
                        name: "LEOP 在轨早期运行"
                      },
                      {
                        id: "capitalgoods-10-71",
                        name: "在轨测试与性能验收"
                      },
                      {
                        id: "capitalgoods-10-72",
                        name: "在轨重构与故障恢复"
                      },
                      {
                        id: "capitalgoods-10-73",
                        name: "退役离轨与碎片缓释装置"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-10-74",
                name: "地面配套与制造支撑",
                children: [
                  {
                    id: "capitalgoods-10-75",
                    name: "地面系统与运控软件",
                    children: [
                      {
                        id: "capitalgoods-10-76",
                        name: "测控地面站"
                      },
                      {
                        id: "capitalgoods-10-77",
                        name: "任务运控中心"
                      },
                      {
                        id: "capitalgoods-10-78",
                        name: "数据接收与处理平台"
                      },
                      {
                        id: "capitalgoods-10-79",
                        name: "地面仿真与数字孪生系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-10-80",
                    name: "制造装备与试验能力",
                    children: [
                      {
                        id: "capitalgoods-10-81",
                        name: "洁净装配与精密装调设备"
                      },
                      {
                        id: "capitalgoods-10-82",
                        name: "热真空与力学环境试验设备"
                      },
                      {
                        id: "capitalgoods-10-83",
                        name: "EMC 测试设备"
                      },
                      {
                        id: "capitalgoods-10-84",
                        name: "元器件筛选与可靠性验证设备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-10-85",
                    name: "横向支撑体系",
                    children: [
                      {
                        id: "capitalgoods-10-86",
                        name: "频率轨道与合规支撑"
                      },
                      {
                        id: "capitalgoods-10-87",
                        name: "质量保证与产品保证"
                      },
                      {
                        id: "capitalgoods-10-88",
                        name: "辐射加固与可靠性工程"
                      },
                      {
                        id: "capitalgoods-10-89",
                        name: "供应链协同与外协加工"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "capitalgoods-11",
            name: "卫星载荷系统",
            children: [
              {
                id: "capitalgoods-11-1",
                name: "任务载荷与产品体系",
                children: [
                  {
                    id: "capitalgoods-11-2",
                    name: "通信载荷",
                    children: [
                      {
                        id: "capitalgoods-11-3",
                        name: "透明转发载荷"
                      },
                      {
                        id: "capitalgoods-11-4",
                        name: "数字透明处理载荷"
                      },
                      {
                        id: "capitalgoods-11-5",
                        name: "再生处理载荷"
                      },
                      {
                        id: "capitalgoods-11-6",
                        name: "有源与无源天线载荷"
                      },
                      {
                        id: "capitalgoods-11-7",
                        name: "波束形成与灵活载荷"
                      },
                      {
                        id: "capitalgoods-11-8",
                        name: "光通信载荷"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-11-9",
                    name: "遥感载荷",
                    children: [
                      {
                        id: "capitalgoods-11-10",
                        name: "全色与多光谱成像载荷"
                      },
                      {
                        id: "capitalgoods-11-11",
                        name: "高光谱成像载荷"
                      },
                      {
                        id: "capitalgoods-11-12",
                        name: "合成孔径雷达载荷"
                      },
                      {
                        id: "capitalgoods-11-13",
                        name: "微波辐射计与散射计载荷"
                      },
                      {
                        id: "capitalgoods-11-14",
                        name: "高度计与海洋探测载荷"
                      },
                      {
                        id: "capitalgoods-11-15",
                        name: "大气环境探测载荷"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-11-16",
                    name: "导航与授时载荷",
                    children: [
                      {
                        id: "capitalgoods-11-17",
                        name: "导航信号生成载荷"
                      },
                      {
                        id: "capitalgoods-11-18",
                        name: "星载原子钟载荷"
                      },
                      {
                        id: "capitalgoods-11-19",
                        name: "搜救转发载荷"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-11-20",
                    name: "科学与专用载荷",
                    children: [
                      {
                        id: "capitalgoods-11-21",
                        name: "射电与微波科学载荷"
                      },
                      {
                        id: "capitalgoods-11-22",
                        name: "红外与紫外科学载荷"
                      },
                      {
                        id: "capitalgoods-11-23",
                        name: "粒子与磁场探测载荷"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-11-24",
                name: "关键组件与技术底座",
                children: [
                  {
                    id: "capitalgoods-11-25",
                    name: "感知与收发前端",
                    children: [
                      {
                        id: "capitalgoods-11-26",
                        name: "望远镜与光学系统"
                      },
                      {
                        id: "capitalgoods-11-27",
                        name: "焦平面探测器与读出电路"
                      },
                      {
                        id: "capitalgoods-11-28",
                        name: "微波前端与收发组件"
                      },
                      {
                        id: "capitalgoods-11-29",
                        name: "低噪声放大器与高功率放大器"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-11-30",
                    name: "信号处理与数据链路",
                    children: [
                      {
                        id: "capitalgoods-11-31",
                        name: "滤波器与频率转换器"
                      },
                      {
                        id: "capitalgoods-11-32",
                        name: "转发器与开关矩阵"
                      },
                      {
                        id: "capitalgoods-11-33",
                        name: "通道化与复接单元"
                      },
                      {
                        id: "capitalgoods-11-34",
                        name: "星上数字处理器与再生处理器"
                      },
                      {
                        id: "capitalgoods-11-35",
                        name: "压缩存储与加密单元"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-11-36",
                    name: "天线与授时核心",
                    children: [
                      {
                        id: "capitalgoods-11-37",
                        name: "抛物面天线与馈源网络"
                      },
                      {
                        id: "capitalgoods-11-38",
                        name: "相控阵天线与波束形成网络"
                      },
                      {
                        id: "capitalgoods-11-39",
                        name: "导航信号发生器与上变频单元"
                      },
                      {
                        id: "capitalgoods-11-40",
                        name: "铷钟与被动氢钟"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-11-41",
                    name: "载荷支撑单元",
                    children: [
                      {
                        id: "capitalgoods-11-42",
                        name: "载荷结构与安装接口"
                      },
                      {
                        id: "capitalgoods-11-43",
                        name: "热控与散热单元"
                      },
                      {
                        id: "capitalgoods-11-44",
                        name: "电源调理与配电接口"
                      },
                      {
                        id: "capitalgoods-11-45",
                        name: "线缆连接器与电磁兼容设计"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-11-46",
                name: "制造集成与验证体系",
                children: [
                  {
                    id: "capitalgoods-11-47",
                    name: "设计与元器件工程",
                    children: [
                      {
                        id: "capitalgoods-11-48",
                        name: "抗辐照器件与宇航级元件"
                      },
                      {
                        id: "capitalgoods-11-49",
                        name: "光机热电协同设计"
                      },
                      {
                        id: "capitalgoods-11-50",
                        name: "软件定义与可重构设计"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-11-51",
                    name: "单机与分系统制造",
                    children: [
                      {
                        id: "capitalgoods-11-52",
                        name: "射频与微波单机制造"
                      },
                      {
                        id: "capitalgoods-11-53",
                        name: "光学载荷总装制造"
                      },
                      {
                        id: "capitalgoods-11-54",
                        name: "探测器封装与组件制造"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-11-55",
                    name: "总装集成与环境试验",
                    children: [
                      {
                        id: "capitalgoods-11-56",
                        name: "载荷总装集成测试"
                      },
                      {
                        id: "capitalgoods-11-57",
                        name: "热真空与力学环境试验"
                      },
                      {
                        id: "capitalgoods-11-58",
                        name: "射频与光学性能测试"
                      },
                      {
                        id: "capitalgoods-11-59",
                        name: "辐射定标与整星接口联试"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-11-60",
                    name: "在轨测试与运维",
                    children: [
                      {
                        id: "capitalgoods-11-61",
                        name: "在轨功能测试"
                      },
                      {
                        id: "capitalgoods-11-62",
                        name: "在轨标定与性能重构"
                      },
                      {
                        id: "capitalgoods-11-63",
                        name: "健康管理与寿命保障"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-11-64",
                name: "地面支撑与应用生态",
                children: [
                  {
                    id: "capitalgoods-11-65",
                    name: "载荷地面系统",
                    children: [
                      {
                        id: "capitalgoods-11-66",
                        name: "测控与任务控制接口"
                      },
                      {
                        id: "capitalgoods-11-67",
                        name: "通信网关与关口站系统"
                      },
                      {
                        id: "capitalgoods-11-68",
                        name: "遥感接收站与定标场系统"
                      },
                      {
                        id: "capitalgoods-11-69",
                        name: "导航上注站与监测站系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-11-70",
                    name: "数据处理与产品化",
                    children: [
                      {
                        id: "capitalgoods-11-71",
                        name: "星上星下协同处理"
                      },
                      {
                        id: "capitalgoods-11-72",
                        name: "数据预处理与反演处理"
                      },
                      {
                        id: "capitalgoods-11-73",
                        name: "时空数据管理与分发平台"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-11-74",
                    name: "整机集成与运营主体",
                    children: [
                      {
                        id: "capitalgoods-11-75",
                        name: "载荷研制单位"
                      },
                      {
                        id: "capitalgoods-11-76",
                        name: "卫星系统集成单位"
                      },
                      {
                        id: "capitalgoods-11-77",
                        name: "卫星运营商与任务业主"
                      },
                      {
                        id: "capitalgoods-11-78",
                        name: "用户终端与行业应用单位"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "capitalgoods-12",
            name: "航天试验与总装测试设备",
            children: [
              {
                id: "capitalgoods-12-1",
                name: "试验基础设施与环境保障",
                children: [
                  {
                    id: "capitalgoods-12-2",
                    name: "洁净与高大间设施",
                    children: [
                      {
                        id: "capitalgoods-12-3",
                        name: "洁净室与高大间"
                      },
                      {
                        id: "capitalgoods-12-4",
                        name: "气流温湿度与压差控制"
                      },
                      {
                        id: "capitalgoods-12-5",
                        name: "分子污染与颗粒污染控制"
                      },
                      {
                        id: "capitalgoods-12-6",
                        name: "工位供配电与气液真空保障"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-12-7",
                    name: "装配搬运与安全保障",
                    children: [
                      {
                        id: "capitalgoods-12-8",
                        name: "起吊与翻转系统"
                      },
                      {
                        id: "capitalgoods-12-9",
                        name: "运输转移与工装台车"
                      },
                      {
                        id: "capitalgoods-12-10",
                        name: "对接定位与锁紧工装"
                      },
                      {
                        id: "capitalgoods-12-11",
                        name: "人机工位与安全防护"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-12-12",
                name: "总装集成与地面支持装备",
                children: [
                  {
                    id: "capitalgoods-12-13",
                    name: "机械地面支持装备",
                    children: [
                      {
                        id: "capitalgoods-12-14",
                        name: "卫星本体装配工装"
                      },
                      {
                        id: "capitalgoods-12-15",
                        name: "载荷与分系统装配工装"
                      },
                      {
                        id: "capitalgoods-12-16",
                        name: "级段与整流罩装配工装"
                      },
                      {
                        id: "capitalgoods-12-17",
                        name: "包装运输与储运容器"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-12-18",
                    name: "电气地面支持装备",
                    children: [
                      {
                        id: "capitalgoods-12-19",
                        name: "供配电与电源仿真设备"
                      },
                      {
                        id: "capitalgoods-12-20",
                        name: "电池与太阳翼仿真设备"
                      },
                      {
                        id: "capitalgoods-12-21",
                        name: "总线接口与协议仿真设备"
                      },
                      {
                        id: "capitalgoods-12-22",
                        name: "测试电缆与脐带系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-12-23",
                    name: "检查测试与自动化系统",
                    children: [
                      {
                        id: "capitalgoods-12-24",
                        name: "总检设备与 SCOE OCOE"
                      },
                      {
                        id: "capitalgoods-12-25",
                        name: "自动测试序列与测试执行系统"
                      },
                      {
                        id: "capitalgoods-12-26",
                        name: "遥测遥控与数据采集系统"
                      },
                      {
                        id: "capitalgoods-12-27",
                        name: "故障注入与闭环仿真系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-12-28",
                name: "环境与性能试验装备",
                children: [
                  {
                    id: "capitalgoods-12-29",
                    name: "力学环境试验装备",
                    children: [
                      {
                        id: "capitalgoods-12-30",
                        name: "振动与模态试验系统"
                      },
                      {
                        id: "capitalgoods-12-31",
                        name: "声学试验系统"
                      },
                      {
                        id: "capitalgoods-12-32",
                        name: "冲击与分离冲击试验系统"
                      },
                      {
                        id: "capitalgoods-12-33",
                        name: "质量特性测量系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-12-34",
                    name: "空间环境模拟装备",
                    children: [
                      {
                        id: "capitalgoods-12-35",
                        name: "热真空试验系统"
                      },
                      {
                        id: "capitalgoods-12-36",
                        name: "热平衡与热循环试验系统"
                      },
                      {
                        id: "capitalgoods-12-37",
                        name: "污染与洁净度验证系统"
                      },
                      {
                        id: "capitalgoods-12-38",
                        name: "磁环境与特殊环境试验系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-12-39",
                    name: "电磁射频与有效载荷测试装备",
                    children: [
                      {
                        id: "capitalgoods-12-40",
                        name: "EMC EMI 试验系统"
                      },
                      {
                        id: "capitalgoods-12-41",
                        name: "射频链路与通信载荷测试系统"
                      },
                      {
                        id: "capitalgoods-12-42",
                        name: "天线与辐射特性测试系统"
                      },
                      {
                        id: "capitalgoods-12-43",
                        name: "光学遥感与载荷标定设备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-12-44",
                    name: "推进与流体试验装备",
                    children: [
                      {
                        id: "capitalgoods-12-45",
                        name: "压力与泄漏试验系统"
                      },
                      {
                        id: "capitalgoods-12-46",
                        name: "推进剂供配与地面流体系统"
                      },
                      {
                        id: "capitalgoods-12-47",
                        name: "推力器与发动机地面热试系统"
                      },
                      {
                        id: "capitalgoods-12-48",
                        name: "管路阀门与贮箱试验系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-12-49",
                    name: "专项验证装备",
                    children: [
                      {
                        id: "capitalgoods-12-50",
                        name: "太阳翼与天线展开试验系统"
                      },
                      {
                        id: "capitalgoods-12-51",
                        name: "分离与释放机构验证装备"
                      },
                      {
                        id: "capitalgoods-12-52",
                        name: "对准测量与几何校准设备"
                      },
                      {
                        id: "capitalgoods-12-53",
                        name: "可靠性与寿命试验装备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-12-54",
                name: "交付服务与数字化能力",
                children: [
                  {
                    id: "capitalgoods-12-55",
                    name: "测试工程服务",
                    children: [
                      {
                        id: "capitalgoods-12-56",
                        name: "试验方案与程序编制"
                      },
                      {
                        id: "capitalgoods-12-57",
                        name: "AIT 执行与试验保障"
                      },
                      {
                        id: "capitalgoods-12-58",
                        name: "校准计量与第三方验证"
                      },
                      {
                        id: "capitalgoods-12-59",
                        name: "维保改造与复用升级"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-12-60",
                    name: "数字化测试能力",
                    children: [
                      {
                        id: "capitalgoods-12-61",
                        name: "测试数据管理平台"
                      },
                      {
                        id: "capitalgoods-12-62",
                        name: "模型关联与试验仿真"
                      },
                      {
                        id: "capitalgoods-12-63",
                        name: "数字孪生与虚拟调试"
                      },
                      {
                        id: "capitalgoods-12-64",
                        name: "质量追溯与配置管理"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    midstream: {
      label: "中游",
      root: {
        id: "capitalgoods-midstream",
        name: "电气零部件与设备",
        children: [
          {
            id: "capitalgoods-13",
            name: "锂离子电池",
            children: [
              {
                id: "capitalgoods-13-1",
                name: "资源与关键材料体系",
                children: [
                  {
                    id: "capitalgoods-13-2",
                    name: "矿产资源与基础化学品",
                    children: [
                      {
                        id: "capitalgoods-13-3",
                        name: "锂资源"
                      },
                      {
                        id: "capitalgoods-13-4",
                        name: "镍资源"
                      },
                      {
                        id: "capitalgoods-13-5",
                        name: "钴资源"
                      },
                      {
                        id: "capitalgoods-13-6",
                        name: "锰资源"
                      },
                      {
                        id: "capitalgoods-13-7",
                        name: "天然石墨与人造石墨原料"
                      },
                      {
                        id: "capitalgoods-13-8",
                        name: "磷化工与氟化工原料"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-13-9",
                    name: "正极材料",
                    children: [
                      {
                        id: "capitalgoods-13-10",
                        name: "磷酸铁锂"
                      },
                      {
                        id: "capitalgoods-13-11",
                        name: "三元材料"
                      },
                      {
                        id: "capitalgoods-13-12",
                        name: "高锰与富锂材料"
                      },
                      {
                        id: "capitalgoods-13-13",
                        name: "前驱体与锂盐"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-13-14",
                    name: "负极材料",
                    children: [
                      {
                        id: "capitalgoods-13-15",
                        name: "人造石墨"
                      },
                      {
                        id: "capitalgoods-13-16",
                        name: "天然石墨"
                      },
                      {
                        id: "capitalgoods-13-17",
                        name: "硅基负极"
                      },
                      {
                        id: "capitalgoods-13-18",
                        name: "锂金属与新型负极"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-13-19",
                    name: "功能辅材",
                    children: [
                      {
                        id: "capitalgoods-13-20",
                        name: "电解液与添加剂"
                      },
                      {
                        id: "capitalgoods-13-21",
                        name: "隔膜与涂覆膜"
                      },
                      {
                        id: "capitalgoods-13-22",
                        name: "铜箔与铝箔"
                      },
                      {
                        id: "capitalgoods-13-23",
                        name: "导电剂与粘结剂"
                      },
                      {
                        id: "capitalgoods-13-24",
                        name: "结构件与热管理材料"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-13-25",
                name: "制造与过程工程",
                children: [
                  {
                    id: "capitalgoods-13-26",
                    name: "材料制备",
                    children: [
                      {
                        id: "capitalgoods-13-27",
                        name: "前驱体合成"
                      },
                      {
                        id: "capitalgoods-13-28",
                        name: "正负极材料合成"
                      },
                      {
                        id: "capitalgoods-13-29",
                        name: "电解液配制与隔膜制膜"
                      },
                      {
                        id: "capitalgoods-13-30",
                        name: "箔材与结构件加工"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-13-31",
                    name: "电芯制造",
                    children: [
                      {
                        id: "capitalgoods-13-32",
                        name: "配料与匀浆"
                      },
                      {
                        id: "capitalgoods-13-33",
                        name: "涂布与干燥"
                      },
                      {
                        id: "capitalgoods-13-34",
                        name: "辊压与分切"
                      },
                      {
                        id: "capitalgoods-13-35",
                        name: "卷绕与叠片"
                      },
                      {
                        id: "capitalgoods-13-36",
                        name: "装配与焊接"
                      },
                      {
                        id: "capitalgoods-13-37",
                        name: "注液与封装"
                      },
                      {
                        id: "capitalgoods-13-38",
                        name: "化成与分容"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-13-39",
                    name: "装备与质量控制",
                    children: [
                      {
                        id: "capitalgoods-13-40",
                        name: "涂布设备"
                      },
                      {
                        id: "capitalgoods-13-41",
                        name: "卷绕叠片设备"
                      },
                      {
                        id: "capitalgoods-13-42",
                        name: "干燥与真空设备"
                      },
                      {
                        id: "capitalgoods-13-43",
                        name: "在线检测与追溯系统"
                      },
                      {
                        id: "capitalgoods-13-44",
                        name: "安全测试与可靠性验证"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-13-45",
                name: "电池产品与系统集成",
                children: [
                  {
                    id: "capitalgoods-13-46",
                    name: "电芯产品体系",
                    children: [
                      {
                        id: "capitalgoods-13-47",
                        name: "方形电芯"
                      },
                      {
                        id: "capitalgoods-13-48",
                        name: "圆柱电芯"
                      },
                      {
                        id: "capitalgoods-13-49",
                        name: "软包电芯"
                      },
                      {
                        id: "capitalgoods-13-50",
                        name: "动力型电芯"
                      },
                      {
                        id: "capitalgoods-13-51",
                        name: "储能型电芯"
                      },
                      {
                        id: "capitalgoods-13-52",
                        name: "消费型电芯"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-13-53",
                    name: "模组与电池包",
                    children: [
                      {
                        id: "capitalgoods-13-54",
                        name: "模组设计"
                      },
                      {
                        id: "capitalgoods-13-55",
                        name: "电池包结构"
                      },
                      {
                        id: "capitalgoods-13-56",
                        name: "无模组集成"
                      },
                      {
                        id: "capitalgoods-13-57",
                        name: "换电兼容设计"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-13-58",
                    name: "管理与安全系统",
                    children: [
                      {
                        id: "capitalgoods-13-59",
                        name: "电池管理系统"
                      },
                      {
                        id: "capitalgoods-13-60",
                        name: "热管理系统"
                      },
                      {
                        id: "capitalgoods-13-61",
                        name: "热失控监测与防护"
                      },
                      {
                        id: "capitalgoods-13-62",
                        name: "状态估计与寿命管理"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-13-63",
                    name: "配套系统",
                    children: [
                      {
                        id: "capitalgoods-13-64",
                        name: "充电系统协同"
                      },
                      {
                        id: "capitalgoods-13-65",
                        name: "储能变流与能量管理"
                      },
                      {
                        id: "capitalgoods-13-66",
                        name: "梯次利用评估系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-13-67",
                name: "应用场景与循环利用",
                children: [
                  {
                    id: "capitalgoods-13-68",
                    name: "终端应用",
                    children: [
                      {
                        id: "capitalgoods-13-69",
                        name: "新能源汽车"
                      },
                      {
                        id: "capitalgoods-13-70",
                        name: "电化学储能"
                      },
                      {
                        id: "capitalgoods-13-71",
                        name: "消费电子"
                      },
                      {
                        id: "capitalgoods-13-72",
                        name: "电动工具与轻型交通"
                      },
                      {
                        id: "capitalgoods-13-73",
                        name: "工业与特种装备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-13-74",
                    name: "服务与运营",
                    children: [
                      {
                        id: "capitalgoods-13-75",
                        name: "电池租赁与换电运营"
                      },
                      {
                        id: "capitalgoods-13-76",
                        name: "售后运维与健康监测"
                      },
                      {
                        id: "capitalgoods-13-77",
                        name: "认证检测服务"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-13-78",
                    name: "回收再生",
                    children: [
                      {
                        id: "capitalgoods-13-79",
                        name: "退役电池回收网络"
                      },
                      {
                        id: "capitalgoods-13-80",
                        name: "拆解与预处理"
                      },
                      {
                        id: "capitalgoods-13-81",
                        name: "火法回收"
                      },
                      {
                        id: "capitalgoods-13-82",
                        name: "湿法回收"
                      },
                      {
                        id: "capitalgoods-13-83",
                        name: "直接再生"
                      },
                      {
                        id: "capitalgoods-13-84",
                        name: "再生材料回用"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-13-85",
                    name: "梯次利用",
                    children: [
                      {
                        id: "capitalgoods-13-86",
                        name: "储能梯次利用"
                      },
                      {
                        id: "capitalgoods-13-87",
                        name: "低速动力梯次利用"
                      },
                      {
                        id: "capitalgoods-13-88",
                        name: "全生命周期追溯"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "capitalgoods-14",
            name: "固态电池",
            children: [
              {
                id: "capitalgoods-14-1",
                name: "关键材料与功能部件",
                children: [
                  {
                    id: "capitalgoods-14-2",
                    name: "正极材料与正极复合层",
                    children: [
                      {
                        id: "capitalgoods-14-3",
                        name: "高镍层状正极"
                      },
                      {
                        id: "capitalgoods-14-4",
                        name: "富锂锰基与高电压正极"
                      },
                      {
                        id: "capitalgoods-14-5",
                        name: "磷酸铁锂与锰铁锂正极"
                      },
                      {
                        id: "capitalgoods-14-6",
                        name: "正极包覆与界面改性"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-14-7",
                    name: "负极材料与负极保护层",
                    children: [
                      {
                        id: "capitalgoods-14-8",
                        name: "锂金属负极"
                      },
                      {
                        id: "capitalgoods-14-9",
                        name: "硅碳与复合负极"
                      },
                      {
                        id: "capitalgoods-14-10",
                        name: "石墨及过渡路线负极"
                      },
                      {
                        id: "capitalgoods-14-11",
                        name: "负极人工界面层"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-14-12",
                    name: "固态电解质体系",
                    children: [
                      {
                        id: "capitalgoods-14-13",
                        name: "硫化物电解质"
                      },
                      {
                        id: "capitalgoods-14-14",
                        name: "氧化物电解质"
                      },
                      {
                        id: "capitalgoods-14-15",
                        name: "聚合物电解质"
                      },
                      {
                        id: "capitalgoods-14-16",
                        name: "卤化物与复合电解质"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-14-17",
                    name: "功能辅材与结构件",
                    children: [
                      {
                        id: "capitalgoods-14-18",
                        name: "集流体"
                      },
                      {
                        id: "capitalgoods-14-19",
                        name: "导电剂与粘结剂"
                      },
                      {
                        id: "capitalgoods-14-20",
                        name: "电解质膜与支撑层"
                      },
                      {
                        id: "capitalgoods-14-21",
                        name: "极耳与封装壳体"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-14-22",
                name: "制造工艺与量产装备",
                children: [
                  {
                    id: "capitalgoods-14-23",
                    name: "材料合成与粉体处理",
                    children: [
                      {
                        id: "capitalgoods-14-24",
                        name: "前驱体合成"
                      },
                      {
                        id: "capitalgoods-14-25",
                        name: "电解质粉体制备"
                      },
                      {
                        id: "capitalgoods-14-26",
                        name: "粉体分级与混料"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-14-27",
                    name: "电极与电解质成形",
                    children: [
                      {
                        id: "capitalgoods-14-28",
                        name: "干法混合与涂布"
                      },
                      {
                        id: "capitalgoods-14-29",
                        name: "流延与压片"
                      },
                      {
                        id: "capitalgoods-14-30",
                        name: "辊压与致密化"
                      },
                      {
                        id: "capitalgoods-14-31",
                        name: "复合电极制备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-14-32",
                    name: "电芯装配与界面构筑",
                    children: [
                      {
                        id: "capitalgoods-14-33",
                        name: "叠片与层压"
                      },
                      {
                        id: "capitalgoods-14-34",
                        name: "热压与界面调控"
                      },
                      {
                        id: "capitalgoods-14-35",
                        name: "干燥环境控制"
                      },
                      {
                        id: "capitalgoods-14-36",
                        name: "封装成形"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-14-37",
                    name: "检测验证与产线保障",
                    children: [
                      {
                        id: "capitalgoods-14-38",
                        name: "在线检测与缺陷识别"
                      },
                      {
                        id: "capitalgoods-14-39",
                        name: "电化学测试"
                      },
                      {
                        id: "capitalgoods-14-40",
                        name: "安全测试与失效分析"
                      },
                      {
                        id: "capitalgoods-14-41",
                        name: "中试线与量产装备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-14-42",
                name: "电芯设计与系统集成",
                children: [
                  {
                    id: "capitalgoods-14-43",
                    name: "半固态与准固态电芯",
                    children: [
                      {
                        id: "capitalgoods-14-44",
                        name: "乘用车高比能电芯"
                      },
                      {
                        id: "capitalgoods-14-45",
                        name: "轻量化动力电芯"
                      },
                      {
                        id: "capitalgoods-14-46",
                        name: "高安全场景电芯"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-14-47",
                    name: "全固态电芯",
                    children: [
                      {
                        id: "capitalgoods-14-48",
                        name: "硫化物路线电芯"
                      },
                      {
                        id: "capitalgoods-14-49",
                        name: "氧化物路线电芯"
                      },
                      {
                        id: "capitalgoods-14-50",
                        name: "聚合物及复合路线电芯"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-14-51",
                    name: "模组包与系统控制",
                    children: [
                      {
                        id: "capitalgoods-14-52",
                        name: "模组结构集成"
                      },
                      {
                        id: "capitalgoods-14-53",
                        name: "电池管理系统"
                      },
                      {
                        id: "capitalgoods-14-54",
                        name: "热管理与压力管理"
                      },
                      {
                        id: "capitalgoods-14-55",
                        name: "快充与功率控制"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-14-56",
                    name: "系统级验证",
                    children: [
                      {
                        id: "capitalgoods-14-57",
                        name: "样件验证"
                      },
                      {
                        id: "capitalgoods-14-58",
                        name: "整车搭载验证"
                      },
                      {
                        id: "capitalgoods-14-59",
                        name: "场景适配验证"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-14-60",
                name: "应用场景与循环生态",
                children: [
                  {
                    id: "capitalgoods-14-61",
                    name: "重点应用场景",
                    children: [
                      {
                        id: "capitalgoods-14-62",
                        name: "乘用车"
                      },
                      {
                        id: "capitalgoods-14-63",
                        name: "商用车与特种车辆"
                      },
                      {
                        id: "capitalgoods-14-64",
                        name: "低空飞行器与机器人"
                      },
                      {
                        id: "capitalgoods-14-65",
                        name: "消费电子与医疗设备"
                      },
                      {
                        id: "capitalgoods-14-66",
                        name: "储能与高安全工业场景"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-14-67",
                    name: "产业化支撑",
                    children: [
                      {
                        id: "capitalgoods-14-68",
                        name: "中试示范"
                      },
                      {
                        id: "capitalgoods-14-69",
                        name: "车规认证与质量体系"
                      },
                      {
                        id: "capitalgoods-14-70",
                        name: "供应链协同与本地化配套"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-14-71",
                    name: "回收与再利用",
                    children: [
                      {
                        id: "capitalgoods-14-72",
                        name: "退役检测与分选"
                      },
                      {
                        id: "capitalgoods-14-73",
                        name: "材料回收"
                      },
                      {
                        id: "capitalgoods-14-74",
                        name: "再生利用与闭环管理"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "capitalgoods-15",
            name: "钠离子电池",
            children: [
              {
                id: "capitalgoods-15-1",
                name: "资源与关键材料",
                children: [
                  {
                    id: "capitalgoods-15-2",
                    name: "钠源与基础化工",
                    children: [
                      {
                        id: "capitalgoods-15-3",
                        name: "纯碱"
                      },
                      {
                        id: "capitalgoods-15-4",
                        name: "烧碱"
                      },
                      {
                        id: "capitalgoods-15-5",
                        name: "钠盐体系"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-15-6",
                    name: "正极材料体系",
                    children: [
                      {
                        id: "capitalgoods-15-7",
                        name: "普鲁士蓝与普鲁士白"
                      },
                      {
                        id: "capitalgoods-15-8",
                        name: "层状氧化物"
                      },
                      {
                        id: "capitalgoods-15-9",
                        name: "聚阴离子化合物"
                      },
                      {
                        id: "capitalgoods-15-10",
                        name: "前驱体与掺杂改性"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-15-11",
                    name: "负极材料体系",
                    children: [
                      {
                        id: "capitalgoods-15-12",
                        name: "硬碳"
                      },
                      {
                        id: "capitalgoods-15-13",
                        name: "软碳"
                      },
                      {
                        id: "capitalgoods-15-14",
                        name: "复合碳材料"
                      },
                      {
                        id: "capitalgoods-15-15",
                        name: "预钠化材料"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-15-16",
                    name: "电解液与辅材",
                    children: [
                      {
                        id: "capitalgoods-15-17",
                        name: "钠盐"
                      },
                      {
                        id: "capitalgoods-15-18",
                        name: "溶剂"
                      },
                      {
                        id: "capitalgoods-15-19",
                        name: "添加剂"
                      },
                      {
                        id: "capitalgoods-15-20",
                        name: "粘结剂与导电剂"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-15-21",
                    name: "隔膜与集流体",
                    children: [
                      {
                        id: "capitalgoods-15-22",
                        name: "聚烯烃隔膜"
                      },
                      {
                        id: "capitalgoods-15-23",
                        name: "陶瓷涂覆隔膜"
                      },
                      {
                        id: "capitalgoods-15-24",
                        name: "正极集流体"
                      },
                      {
                        id: "capitalgoods-15-25",
                        name: "负极集流体"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-15-26",
                    name: "装备与制造辅料",
                    children: [
                      {
                        id: "capitalgoods-15-27",
                        name: "混料涂布辊压装备"
                      },
                      {
                        id: "capitalgoods-15-28",
                        name: "分切叠片卷绕装备"
                      },
                      {
                        id: "capitalgoods-15-29",
                        name: "注液封装化成分容装备"
                      },
                      {
                        id: "capitalgoods-15-30",
                        name: "干燥净化与检测设备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-15-31",
                name: "电芯设计与制造工程",
                children: [
                  {
                    id: "capitalgoods-15-32",
                    name: "电芯化学体系设计",
                    children: [
                      {
                        id: "capitalgoods-15-33",
                        name: "普鲁士蓝类体系"
                      },
                      {
                        id: "capitalgoods-15-34",
                        name: "层状氧化物体系"
                      },
                      {
                        id: "capitalgoods-15-35",
                        name: "聚阴离子体系"
                      },
                      {
                        id: "capitalgoods-15-36",
                        name: "双化学混合体系"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-15-37",
                    name: "电极制造",
                    children: [
                      {
                        id: "capitalgoods-15-38",
                        name: "浆料制备"
                      },
                      {
                        id: "capitalgoods-15-39",
                        name: "涂布干燥"
                      },
                      {
                        id: "capitalgoods-15-40",
                        name: "辊压分切"
                      },
                      {
                        id: "capitalgoods-15-41",
                        name: "极片烘烤"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-15-42",
                    name: "电芯装配",
                    children: [
                      {
                        id: "capitalgoods-15-43",
                        name: "叠片工艺"
                      },
                      {
                        id: "capitalgoods-15-44",
                        name: "卷绕工艺"
                      },
                      {
                        id: "capitalgoods-15-45",
                        name: "方形铝壳"
                      },
                      {
                        id: "capitalgoods-15-46",
                        name: "圆柱与软包"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-15-47",
                    name: "化成分容与测试验证",
                    children: [
                      {
                        id: "capitalgoods-15-48",
                        name: "化成老化"
                      },
                      {
                        id: "capitalgoods-15-49",
                        name: "分容分选"
                      },
                      {
                        id: "capitalgoods-15-50",
                        name: "安全测试"
                      },
                      {
                        id: "capitalgoods-15-51",
                        name: "低温性能测试"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-15-52",
                    name: "质量控制与工艺数字化",
                    children: [
                      {
                        id: "capitalgoods-15-53",
                        name: "在线检测"
                      },
                      {
                        id: "capitalgoods-15-54",
                        name: "过程控制软件"
                      },
                      {
                        id: "capitalgoods-15-55",
                        name: "良率与追溯系统"
                      },
                      {
                        id: "capitalgoods-15-56",
                        name: "实验室与中试平台"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-15-57",
                name: "系统集成与应用生态",
                children: [
                  {
                    id: "capitalgoods-15-58",
                    name: "模组与电池包",
                    children: [
                      {
                        id: "capitalgoods-15-59",
                        name: "结构件与连接件"
                      },
                      {
                        id: "capitalgoods-15-60",
                        name: "模组集成"
                      },
                      {
                        id: "capitalgoods-15-61",
                        name: "包级集成"
                      },
                      {
                        id: "capitalgoods-15-62",
                        name: "电气安全设计"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-15-63",
                    name: "管理与热安全",
                    children: [
                      {
                        id: "capitalgoods-15-64",
                        name: "电池管理系统"
                      },
                      {
                        id: "capitalgoods-15-65",
                        name: "热管理系统"
                      },
                      {
                        id: "capitalgoods-15-66",
                        name: "绝缘与消防设计"
                      },
                      {
                        id: "capitalgoods-15-67",
                        name: "能量管理与调度接口"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-15-68",
                    name: "应用终端",
                    children: [
                      {
                        id: "capitalgoods-15-69",
                        name: "储能系统"
                      },
                      {
                        id: "capitalgoods-15-70",
                        name: "两轮车与低速车"
                      },
                      {
                        id: "capitalgoods-15-71",
                        name: "乘用车与混动配套"
                      },
                      {
                        id: "capitalgoods-15-72",
                        name: "商用车与工程机械"
                      },
                      {
                        id: "capitalgoods-15-73",
                        name: "启停与备用电源"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-15-74",
                    name: "交付与运维",
                    children: [
                      {
                        id: "capitalgoods-15-75",
                        name: "逆变与电力电子协同"
                      },
                      {
                        id: "capitalgoods-15-76",
                        name: "系统集成服务"
                      },
                      {
                        id: "capitalgoods-15-77",
                        name: "EPC与并网调试"
                      },
                      {
                        id: "capitalgoods-15-78",
                        name: "运维与寿命管理"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-15-79",
                name: "循环利用与产业支撑",
                children: [
                  {
                    id: "capitalgoods-15-80",
                    name: "梯次利用与回收",
                    children: [
                      {
                        id: "capitalgoods-15-81",
                        name: "退役检测与分级"
                      },
                      {
                        id: "capitalgoods-15-82",
                        name: "梯次利用"
                      },
                      {
                        id: "capitalgoods-15-83",
                        name: "拆解破碎"
                      },
                      {
                        id: "capitalgoods-15-84",
                        name: "材料再生"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-15-85",
                    name: "标准认证与测试平台",
                    children: [
                      {
                        id: "capitalgoods-15-86",
                        name: "电芯与系统标准"
                      },
                      {
                        id: "capitalgoods-15-87",
                        name: "运输与储存规范"
                      },
                      {
                        id: "capitalgoods-15-88",
                        name: "第三方检测认证"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-15-89",
                    name: "产业化支撑",
                    children: [
                      {
                        id: "capitalgoods-15-90",
                        name: "研发机构与联合创新"
                      },
                      {
                        id: "capitalgoods-15-91",
                        name: "设备与产线工程服务"
                      },
                      {
                        id: "capitalgoods-15-92",
                        name: "资本与供应链协同"
                      },
                      {
                        id: "capitalgoods-15-93",
                        name: "数字化与碳足迹管理"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    downstream: {
      label: "下游",
      root: {
        id: "capitalgoods-downstream",
        name: "工程与工业机械",
        children: [
          {
            id: "capitalgoods-16",
            name: "绿色智能船舶",
            children: [
              {
                id: "capitalgoods-16-1",
                name: "船型与任务场景",
                children: [
                  {
                    id: "capitalgoods-16-2",
                    name: "商船与公共服务船型",
                    children: [
                      {
                        id: "capitalgoods-16-3",
                        name: "集装箱船与散货船"
                      },
                      {
                        id: "capitalgoods-16-4",
                        name: "油化船与气体运输船"
                      },
                      {
                        id: "capitalgoods-16-5",
                        name: "客滚船与邮轮"
                      },
                      {
                        id: "capitalgoods-16-6",
                        name: "工程船与公务船"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-16-7",
                    name: "内河与近海示范场景",
                    children: [
                      {
                        id: "capitalgoods-16-8",
                        name: "内河货运与旅游客运"
                      },
                      {
                        id: "capitalgoods-16-9",
                        name: "港作拖轮与作业船"
                      },
                      {
                        id: "capitalgoods-16-10",
                        name: "近海运输与海工服务"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-16-11",
                name: "绿色动力与船载装备",
                children: [
                  {
                    id: "capitalgoods-16-12",
                    name: "船体与节能总装",
                    children: [
                      {
                        id: "capitalgoods-16-13",
                        name: "船型设计与流体优化"
                      },
                      {
                        id: "capitalgoods-16-14",
                        name: "轻量化结构与材料"
                      },
                      {
                        id: "capitalgoods-16-15",
                        name: "涂层减阻与空气润滑"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-16-16",
                    name: "动力与能源系统",
                    children: [
                      {
                        id: "capitalgoods-16-17",
                        name: "双燃料主机与清洁燃料发动机"
                      },
                      {
                        id: "capitalgoods-16-18",
                        name: "电推进与混合动力系统"
                      },
                      {
                        id: "capitalgoods-16-19",
                        name: "燃料电池与电池系统"
                      },
                      {
                        id: "capitalgoods-16-20",
                        name: "轴带发电与余热回收"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-16-21",
                    name: "燃料储供与安全系统",
                    children: [
                      {
                        id: "capitalgoods-16-22",
                        name: "LNG 储供系统"
                      },
                      {
                        id: "capitalgoods-16-23",
                        name: "甲醇储供系统"
                      },
                      {
                        id: "capitalgoods-16-24",
                        name: "氨燃料储供系统"
                      },
                      {
                        id: "capitalgoods-16-25",
                        name: "氢储供与制氢系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-16-26",
                    name: "机舱与关键配套",
                    children: [
                      {
                        id: "capitalgoods-16-27",
                        name: "传动与推进器"
                      },
                      {
                        id: "capitalgoods-16-28",
                        name: "配电与能量管理"
                      },
                      {
                        id: "capitalgoods-16-29",
                        name: "泵阀管系与热管理"
                      },
                      {
                        id: "capitalgoods-16-30",
                        name: "尾气治理与碳捕集"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-16-31",
                name: "智能感知与自主控制",
                children: [
                  {
                    id: "capitalgoods-16-32",
                    name: "航行感知与导航",
                    children: [
                      {
                        id: "capitalgoods-16-33",
                        name: "雷达与 AIS"
                      },
                      {
                        id: "capitalgoods-16-34",
                        name: "视觉与红外感知"
                      },
                      {
                        id: "capitalgoods-16-35",
                        name: "北斗 GNSS 与惯导"
                      },
                      {
                        id: "capitalgoods-16-36",
                        name: "电子海图与航线规划"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-16-37",
                    name: "智能决策与控制",
                    children: [
                      {
                        id: "capitalgoods-16-38",
                        name: "航速航线优化"
                      },
                      {
                        id: "capitalgoods-16-39",
                        name: "碰撞预警与避碰决策"
                      },
                      {
                        id: "capitalgoods-16-40",
                        name: "自主靠离泊与动力定位"
                      },
                      {
                        id: "capitalgoods-16-41",
                        name: "远程遥控与岸基驾控"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-16-42",
                    name: "机舱智能与健康管理",
                    children: [
                      {
                        id: "capitalgoods-16-43",
                        name: "状态监测与故障诊断"
                      },
                      {
                        id: "capitalgoods-16-44",
                        name: "预测性维护"
                      },
                      {
                        id: "capitalgoods-16-45",
                        name: "智能能效管理"
                      },
                      {
                        id: "capitalgoods-16-46",
                        name: "货物与作业智能管理"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-16-47",
                    name: "数据与通信基础",
                    children: [
                      {
                        id: "capitalgoods-16-48",
                        name: "船舶集成平台"
                      },
                      {
                        id: "capitalgoods-16-49",
                        name: "工业网络与边缘计算"
                      },
                      {
                        id: "capitalgoods-16-50",
                        name: "卫星通信与 5G 专网"
                      },
                      {
                        id: "capitalgoods-16-51",
                        name: "网络安全与功能安全"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-16-52",
                name: "产业支撑与运营生态",
                children: [
                  {
                    id: "capitalgoods-16-53",
                    name: "设计建造与总装配套",
                    children: [
                      {
                        id: "capitalgoods-16-54",
                        name: "船舶设计院与仿真软件"
                      },
                      {
                        id: "capitalgoods-16-55",
                        name: "船厂总装与模块化建造"
                      },
                      {
                        id: "capitalgoods-16-56",
                        name: "关键配套设备制造"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-16-57",
                    name: "基础设施与能源补给",
                    children: [
                      {
                        id: "capitalgoods-16-58",
                        name: "绿色燃料制备与加注"
                      },
                      {
                        id: "capitalgoods-16-59",
                        name: "充换电与岸电"
                      },
                      {
                        id: "capitalgoods-16-60",
                        name: "港口智能化与智慧航道"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-16-61",
                    name: "规则标准与验证认证",
                    children: [
                      {
                        id: "capitalgoods-16-62",
                        name: "IMO 与国家政策"
                      },
                      {
                        id: "capitalgoods-16-63",
                        name: "船级社规范与检验"
                      },
                      {
                        id: "capitalgoods-16-64",
                        name: "测试验证与示范应用"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-16-65",
                    name: "运营服务与金融支持",
                    children: [
                      {
                        id: "capitalgoods-16-66",
                        name: "船舶运营与运维服务"
                      },
                      {
                        id: "capitalgoods-16-67",
                        name: "碳管理与数据服务"
                      },
                      {
                        id: "capitalgoods-16-68",
                        name: "保险租赁与绿色金融"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "capitalgoods-17",
            name: "海洋工程装备",
            children: [
              {
                id: "capitalgoods-17-1",
                name: "核心材料与基础部件",
                children: [
                  {
                    id: "capitalgoods-17-2",
                    name: "结构材料与防护",
                    children: [
                      {
                        id: "capitalgoods-17-3",
                        name: "特种钢材与厚板"
                      },
                      {
                        id: "capitalgoods-17-4",
                        name: "有色金属与复合材料"
                      },
                      {
                        id: "capitalgoods-17-5",
                        name: "防腐涂层与阴极保护"
                      },
                      {
                        id: "capitalgoods-17-6",
                        name: "密封材料与耐压材料"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-17-7",
                    name: "通用机电与动力部件",
                    children: [
                      {
                        id: "capitalgoods-17-8",
                        name: "柴油机与燃气轮机"
                      },
                      {
                        id: "capitalgoods-17-9",
                        name: "发电机与电驱系统"
                      },
                      {
                        id: "capitalgoods-17-10",
                        name: "齿轮箱与轴承"
                      },
                      {
                        id: "capitalgoods-17-11",
                        name: "液压件与气动件"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-17-12",
                    name: "电气控制与感知部件",
                    children: [
                      {
                        id: "capitalgoods-17-13",
                        name: "配电与变流设备"
                      },
                      {
                        id: "capitalgoods-17-14",
                        name: "工业控制器与监测仪表"
                      },
                      {
                        id: "capitalgoods-17-15",
                        name: "导航定位与通信设备"
                      },
                      {
                        id: "capitalgoods-17-16",
                        name: "水下传感器与声学设备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-17-17",
                    name: "连接输送与安全部件",
                    children: [
                      {
                        id: "capitalgoods-17-18",
                        name: "阀门与泵压设备"
                      },
                      {
                        id: "capitalgoods-17-19",
                        name: "电缆脐带缆与连接器"
                      },
                      {
                        id: "capitalgoods-17-20",
                        name: "管材立管与软管"
                      },
                      {
                        id: "capitalgoods-17-21",
                        name: "系泊链缆与锚泊件"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-17-22",
                name: "平台结构与专用装备",
                children: [
                  {
                    id: "capitalgoods-17-23",
                    name: "海上油气开发装备",
                    children: [
                      {
                        id: "capitalgoods-17-24",
                        name: "自升式钻井平台"
                      },
                      {
                        id: "capitalgoods-17-25",
                        name: "半潜式平台与钻井船"
                      },
                      {
                        id: "capitalgoods-17-26",
                        name: "FPSO 与生产平台"
                      },
                      {
                        id: "capitalgoods-17-27",
                        name: "井口与井控装备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-17-28",
                    name: "海上风电工程装备",
                    children: [
                      {
                        id: "capitalgoods-17-29",
                        name: "风机安装船"
                      },
                      {
                        id: "capitalgoods-17-30",
                        name: "铺缆船与起重船"
                      },
                      {
                        id: "capitalgoods-17-31",
                        name: "运维母船与服务船"
                      },
                      {
                        id: "capitalgoods-17-32",
                        name: "海上升压与浮式基础装备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-17-33",
                    name: "深海资源与海洋调查装备",
                    children: [
                      {
                        id: "capitalgoods-17-34",
                        name: "载人深潜器"
                      },
                      {
                        id: "capitalgoods-17-35",
                        name: "ROV 与 AUV"
                      },
                      {
                        id: "capitalgoods-17-36",
                        name: "深海钻采装备"
                      },
                      {
                        id: "capitalgoods-17-37",
                        name: "海洋测绘与勘探装备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-17-38",
                    name: "通用作业与辅助装备",
                    children: [
                      {
                        id: "capitalgoods-17-39",
                        name: "起重与吊装系统"
                      },
                      {
                        id: "capitalgoods-17-40",
                        name: "甲板机械与升降系统"
                      },
                      {
                        id: "capitalgoods-17-41",
                        name: "动态定位与推进系统"
                      },
                      {
                        id: "capitalgoods-17-42",
                        name: "安全救生与生活保障系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-17-43",
                name: "海底系统与海上作业装备",
                children: [
                  {
                    id: "capitalgoods-17-44",
                    name: "海底生产与输送系统",
                    children: [
                      {
                        id: "capitalgoods-17-45",
                        name: "海底井口与采油树"
                      },
                      {
                        id: "capitalgoods-17-46",
                        name: "海底控制系统"
                      },
                      {
                        id: "capitalgoods-17-47",
                        name: "管汇与分配系统"
                      },
                      {
                        id: "capitalgoods-17-48",
                        name: "立管脐带缆与海底管线"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-17-49",
                    name: "海上施工与安装装备",
                    children: [
                      {
                        id: "capitalgoods-17-50",
                        name: "吊装系统与张紧系统"
                      },
                      {
                        id: "capitalgoods-17-51",
                        name: "铺管铺缆系统"
                      },
                      {
                        id: "capitalgoods-17-52",
                        name: "打桩与基础施工装备"
                      },
                      {
                        id: "capitalgoods-17-53",
                        name: "水下连接与维修工具"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-17-54",
                    name: "检测试验与认证支撑",
                    children: [
                      {
                        id: "capitalgoods-17-55",
                        name: "无损检测设备"
                      },
                      {
                        id: "capitalgoods-17-56",
                        name: "环境与载荷测试设备"
                      },
                      {
                        id: "capitalgoods-17-57",
                        name: "模拟仿真与试验平台"
                      },
                      {
                        id: "capitalgoods-17-58",
                        name: "认证检验与技术服务"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-17-59",
                    name: "港口基地与配套保障",
                    children: [
                      {
                        id: "capitalgoods-17-60",
                        name: "海工建造基地"
                      },
                      {
                        id: "capitalgoods-17-61",
                        name: "总装码头与重件运输"
                      },
                      {
                        id: "capitalgoods-17-62",
                        name: "备件仓储与供应保障"
                      },
                      {
                        id: "capitalgoods-17-63",
                        name: "海上补给与应急支持"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-17-64",
                name: "运维保障与延伸应用",
                children: [
                  {
                    id: "capitalgoods-17-65",
                    name: "运营维护",
                    children: [
                      {
                        id: "capitalgoods-17-66",
                        name: "状态监测与健康管理"
                      },
                      {
                        id: "capitalgoods-17-67",
                        name: "水下巡检与清洗机器人"
                      },
                      {
                        id: "capitalgoods-17-68",
                        name: "腐蚀防护与修复"
                      },
                      {
                        id: "capitalgoods-17-69",
                        name: "改造升级与寿命延长"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-17-70",
                    name: "数字化与智能化",
                    children: [
                      {
                        id: "capitalgoods-17-71",
                        name: "海工设计软件"
                      },
                      {
                        id: "capitalgoods-17-72",
                        name: "远程运维平台"
                      },
                      {
                        id: "capitalgoods-17-73",
                        name: "数字孪生与仿真"
                      },
                      {
                        id: "capitalgoods-17-74",
                        name: "自主作业控制系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-17-75",
                    name: "退役与再利用",
                    children: [
                      {
                        id: "capitalgoods-17-76",
                        name: "平台拆除"
                      },
                      {
                        id: "capitalgoods-17-77",
                        name: "海底设施回收"
                      },
                      {
                        id: "capitalgoods-17-78",
                        name: "材料循环利用"
                      },
                      {
                        id: "capitalgoods-17-79",
                        name: "环境修复"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-17-80",
                    name: "延伸应用场景",
                    children: [
                      {
                        id: "capitalgoods-17-81",
                        name: "海上油气开发"
                      },
                      {
                        id: "capitalgoods-17-82",
                        name: "海上风电开发"
                      },
                      {
                        id: "capitalgoods-17-83",
                        name: "深海资源开发"
                      },
                      {
                        id: "capitalgoods-17-84",
                        name: "海洋新能源与 CCUS"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "capitalgoods-18",
            name: "工业具身智能机器人",
            children: [
              {
                id: "capitalgoods-18-1",
                name: "关键硬件与通用底座",
                children: [
                  {
                    id: "capitalgoods-18-2",
                    name: "机器人本体与执行机构",
                    children: [
                      {
                        id: "capitalgoods-18-3",
                        name: "机身骨架与轻量化结构件"
                      },
                      {
                        id: "capitalgoods-18-4",
                        name: "关节模组与连接机构"
                      },
                      {
                        id: "capitalgoods-18-5",
                        name: "末端执行器与灵巧手"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-18-6",
                    name: "动力传动与供能系统",
                    children: [
                      {
                        id: "capitalgoods-18-7",
                        name: "伺服电机与驱动器"
                      },
                      {
                        id: "capitalgoods-18-8",
                        name: "减速器与滚柱丝杠"
                      },
                      {
                        id: "capitalgoods-18-9",
                        name: "制动平衡与力控执行单元"
                      },
                      {
                        id: "capitalgoods-18-10",
                        name: "电池与电源管理系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-18-11",
                    name: "感知与计算硬件",
                    children: [
                      {
                        id: "capitalgoods-18-12",
                        name: "视觉与深度感知模组"
                      },
                      {
                        id: "capitalgoods-18-13",
                        name: "力觉触觉与位姿感知模组"
                      },
                      {
                        id: "capitalgoods-18-14",
                        name: "边缘计算与AI芯片"
                      },
                      {
                        id: "capitalgoods-18-15",
                        name: "通信总线与安全控制器"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-18-16",
                name: "具身智能软件与系统工程",
                children: [
                  {
                    id: "capitalgoods-18-17",
                    name: "感知建模与数据闭环",
                    children: [
                      {
                        id: "capitalgoods-18-18",
                        name: "多传感器融合"
                      },
                      {
                        id: "capitalgoods-18-19",
                        name: "场景理解与世界模型"
                      },
                      {
                        id: "capitalgoods-18-20",
                        name: "数据采集标注与回灌"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-18-21",
                    name: "运动智能与任务执行",
                    children: [
                      {
                        id: "capitalgoods-18-22",
                        name: "运控与全身协调控制"
                      },
                      {
                        id: "capitalgoods-18-23",
                        name: "抓取操作与技能库"
                      },
                      {
                        id: "capitalgoods-18-24",
                        name: "任务规划与行为决策"
                      },
                      {
                        id: "capitalgoods-18-25",
                        name: "人机协同与自然交互"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-18-26",
                    name: "仿真训练与部署平台",
                    children: [
                      {
                        id: "capitalgoods-18-27",
                        name: "数字孪生与仿真环境"
                      },
                      {
                        id: "capitalgoods-18-28",
                        name: "模仿学习与强化学习"
                      },
                      {
                        id: "capitalgoods-18-29",
                        name: "机器人基础模型与推理部署"
                      },
                      {
                        id: "capitalgoods-18-30",
                        name: "中间件与云边端协同"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-18-31",
                name: "制造集成与验证体系",
                children: [
                  {
                    id: "capitalgoods-18-32",
                    name: "核心部件制造",
                    children: [
                      {
                        id: "capitalgoods-18-33",
                        name: "结构件加工与装配"
                      },
                      {
                        id: "capitalgoods-18-34",
                        name: "关节模组总成"
                      },
                      {
                        id: "capitalgoods-18-35",
                        name: "传感器与控制板卡封装"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-18-36",
                    name: "整机集成与调试",
                    children: [
                      {
                        id: "capitalgoods-18-37",
                        name: "线束与热管理"
                      },
                      {
                        id: "capitalgoods-18-38",
                        name: "标定与校准"
                      },
                      {
                        id: "capitalgoods-18-39",
                        name: "可靠性与寿命验证"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-18-40",
                    name: "工业现场集成",
                    children: [
                      {
                        id: "capitalgoods-18-41",
                        name: "PLC与工业控制系统对接"
                      },
                      {
                        id: "capitalgoods-18-42",
                        name: "MES与WMS系统对接"
                      },
                      {
                        id: "capitalgoods-18-43",
                        name: "工位级部署与柔性改造"
                      },
                      {
                        id: "capitalgoods-18-44",
                        name: "功能安全与防护体系"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-18-45",
                name: "场景落地与产业生态",
                children: [
                  {
                    id: "capitalgoods-18-46",
                    name: "制造作业场景",
                    children: [
                      {
                        id: "capitalgoods-18-47",
                        name: "上下料与搬运"
                      },
                      {
                        id: "capitalgoods-18-48",
                        name: "分拣与码垛"
                      },
                      {
                        id: "capitalgoods-18-49",
                        name: "机床看护与工位协作"
                      },
                      {
                        id: "capitalgoods-18-50",
                        name: "装配拧紧与视觉检测"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-18-51",
                    name: "物流与仓储场景",
                    children: [
                      {
                        id: "capitalgoods-18-52",
                        name: "仓内搬运与补货"
                      },
                      {
                        id: "capitalgoods-18-53",
                        name: "拣选分拨与调度"
                      },
                      {
                        id: "capitalgoods-18-54",
                        name: "多机协同与路径管理"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-18-55",
                    name: "特种与延伸场景",
                    children: [
                      {
                        id: "capitalgoods-18-56",
                        name: "危险环境作业"
                      },
                      {
                        id: "capitalgoods-18-57",
                        name: "能源与基础设施巡检"
                      },
                      {
                        id: "capitalgoods-18-58",
                        name: "医药食品洁净场景"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-18-59",
                    name: "产业服务与保障",
                    children: [
                      {
                        id: "capitalgoods-18-60",
                        name: "系统集成与工程交付"
                      },
                      {
                        id: "capitalgoods-18-61",
                        name: "标准测试与认证"
                      },
                      {
                        id: "capitalgoods-18-62",
                        name: "售后运维与远程诊断"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "capitalgoods-19",
            name: "特殊作业机器人",
            children: [
              {
                id: "capitalgoods-19-1",
                name: "关键要素与核心部件",
                children: [
                  {
                    id: "capitalgoods-19-2",
                    name: "感知与定位",
                    children: [
                      {
                        id: "capitalgoods-19-3",
                        name: "机器视觉与热视频感知"
                      },
                      {
                        id: "capitalgoods-19-4",
                        name: "激光雷达与毫米波雷达"
                      },
                      {
                        id: "capitalgoods-19-5",
                        name: "声呐与水下导航感知"
                      },
                      {
                        id: "capitalgoods-19-6",
                        name: "GNSS、IMU、UWB 与里程计"
                      },
                      {
                        id: "capitalgoods-19-7",
                        name: "气体、辐射、压力、温湿度与姿态传感"
                      },
                      {
                        id: "capitalgoods-19-8",
                        name: "无损检测与测绘传感载荷"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-19-9",
                    name: "驱动与运动",
                    children: [
                      {
                        id: "capitalgoods-19-10",
                        name: "伺服电机与驱动器"
                      },
                      {
                        id: "capitalgoods-19-11",
                        name: "减速器、丝杠与关节模组"
                      },
                      {
                        id: "capitalgoods-19-12",
                        name: "液压与气动作动系统"
                      },
                      {
                        id: "capitalgoods-19-13",
                        name: "轮式、履带、足式与爬附机构"
                      },
                      {
                        id: "capitalgoods-19-14",
                        name: "水下推进与姿态控制装置"
                      },
                      {
                        id: "capitalgoods-19-15",
                        name: "飞控动力与系留供能系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-19-16",
                    name: "控制、计算与通信",
                    children: [
                      {
                        id: "capitalgoods-19-17",
                        name: "嵌入式主控与边缘计算单元"
                      },
                      {
                        id: "capitalgoods-19-18",
                        name: "运动控制器与安全控制器"
                      },
                      {
                        id: "capitalgoods-19-19",
                        name: "电源管理与快换补能系统"
                      },
                      {
                        id: "capitalgoods-19-20",
                        name: "5G、专网、Mesh、卫星与光纤链路"
                      },
                      {
                        id: "capitalgoods-19-21",
                        name: "遥操作台、力反馈与远程协同界面"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-19-22",
                name: "平台产品与作业系统",
                children: [
                  {
                    id: "capitalgoods-19-23",
                    name: "机器人平台",
                    children: [
                      {
                        id: "capitalgoods-19-24",
                        name: "地面特种移动机器人"
                      },
                      {
                        id: "capitalgoods-19-25",
                        name: "特种无人机与系留无人机"
                      },
                      {
                        id: "capitalgoods-19-26",
                        name: "水下 ROV 与 AUV"
                      },
                      {
                        id: "capitalgoods-19-27",
                        name: "管道、罐体、壁面与缆索机器人"
                      },
                      {
                        id: "capitalgoods-19-28",
                        name: "核辐射与高危环境机器人"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-19-29",
                    name: "操作执行系统",
                    children: [
                      {
                        id: "capitalgoods-19-30",
                        name: "机械臂、灵巧手与末端执行器"
                      },
                      {
                        id: "capitalgoods-19-31",
                        name: "抓取、搬运与阀门操作模块"
                      },
                      {
                        id: "capitalgoods-19-32",
                        name: "切割、破拆、喷涂、清洗与打磨模块"
                      },
                      {
                        id: "capitalgoods-19-33",
                        name: "焊接、封堵、取样与排障模块"
                      },
                      {
                        id: "capitalgoods-19-34",
                        name: "排爆与危险品处置模块"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-19-35",
                    name: "检测与智能作业",
                    children: [
                      {
                        id: "capitalgoods-19-36",
                        name: "缺陷识别与状态诊断"
                      },
                      {
                        id: "capitalgoods-19-37",
                        name: "三维建模与数字测绘"
                      },
                      {
                        id: "capitalgoods-19-38",
                        name: "SLAM、定位建图与路径规划"
                      },
                      {
                        id: "capitalgoods-19-39",
                        name: "自主避障与半自主作业控制"
                      },
                      {
                        id: "capitalgoods-19-40",
                        name: "多机协同与任务调度系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-19-41",
                name: "制造集成与验证保障",
                children: [
                  {
                    id: "capitalgoods-19-42",
                    name: "研发与系统集成",
                    children: [
                      {
                        id: "capitalgoods-19-43",
                        name: "机体结构与环境适应设计"
                      },
                      {
                        id: "capitalgoods-19-44",
                        name: "载荷集成与行业工艺适配"
                      },
                      {
                        id: "capitalgoods-19-45",
                        name: "软件栈开发与云边端部署"
                      },
                      {
                        id: "capitalgoods-19-46",
                        name: "数字孪生与仿真训练"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-19-47",
                    name: "测试与认证",
                    children: [
                      {
                        id: "capitalgoods-19-48",
                        name: "环境试验与可靠性验证"
                      },
                      {
                        id: "capitalgoods-19-49",
                        name: "EMC 与通信鲁棒性测试"
                      },
                      {
                        id: "capitalgoods-19-50",
                        name: "功能安全与网络安全验证"
                      },
                      {
                        id: "capitalgoods-19-51",
                        name: "行业标准测试与场景验收"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-19-52",
                    name: "运维与服务",
                    children: [
                      {
                        id: "capitalgoods-19-53",
                        name: "备件与维保体系"
                      },
                      {
                        id: "capitalgoods-19-54",
                        name: "操作培训与演练"
                      },
                      {
                        id: "capitalgoods-19-55",
                        name: "租赁、订阅与 RaaS 服务"
                      },
                      {
                        id: "capitalgoods-19-56",
                        name: "数据闭环与持续优化"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-19-57",
                name: "应用场景与产业生态",
                children: [
                  {
                    id: "capitalgoods-19-58",
                    name: "应急救援与公共安全",
                    children: [
                      {
                        id: "capitalgoods-19-59",
                        name: "消防侦检与灾害搜救"
                      },
                      {
                        id: "capitalgoods-19-60",
                        name: "排爆排危与危险品处置"
                      },
                      {
                        id: "capitalgoods-19-61",
                        name: "安防巡检与边海防任务"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-19-62",
                    name: "能源与工业设施",
                    children: [
                      {
                        id: "capitalgoods-19-63",
                        name: "电力设施巡检与带电辅助作业"
                      },
                      {
                        id: "capitalgoods-19-64",
                        name: "石油化工与油气储运设施作业"
                      },
                      {
                        id: "capitalgoods-19-65",
                        name: "海工平台、港航与海上风电运维"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-19-66",
                    name: "特种环境作业",
                    children: [
                      {
                        id: "capitalgoods-19-67",
                        name: "矿山、隧道与地下空间作业"
                      },
                      {
                        id: "capitalgoods-19-68",
                        name: "核设施与辐射环境作业"
                      },
                      {
                        id: "capitalgoods-19-69",
                        name: "高温、高压、密闭与有毒环境作业"
                      },
                      {
                        id: "capitalgoods-19-70",
                        name: "航天、极地与超常环境作业"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-19-71",
                    name: "产业支撑",
                    children: [
                      {
                        id: "capitalgoods-19-72",
                        name: "系统集成商与行业解决方案商"
                      },
                      {
                        id: "capitalgoods-19-73",
                        name: "测试认证与标准服务机构"
                      },
                      {
                        id: "capitalgoods-19-74",
                        name: "保险、融资租赁与运维服务商"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "capitalgoods-20",
            name: "增材制造装备",
            children: [
              {
                id: "capitalgoods-20-1",
                name: "数字设计与工艺底座",
                children: [
                  {
                    id: "capitalgoods-20-2",
                    name: "设计与数据准备",
                    children: [
                      {
                        id: "capitalgoods-20-3",
                        name: "三维设计与逆向建模"
                      },
                      {
                        id: "capitalgoods-20-4",
                        name: "CAE 与拓扑优化"
                      },
                      {
                        id: "capitalgoods-20-5",
                        name: "切片与排版"
                      },
                      {
                        id: "capitalgoods-20-6",
                        name: "工艺仿真与参数库"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-20-7",
                    name: "控制软件与数据系统",
                    children: [
                      {
                        id: "capitalgoods-20-8",
                        name: "设备控制软件"
                      },
                      {
                        id: "capitalgoods-20-9",
                        name: "人机界面与作业管理"
                      },
                      {
                        id: "capitalgoods-20-10",
                        name: "过程监测软件"
                      },
                      {
                        id: "capitalgoods-20-11",
                        name: "数据管理与质量追溯"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-20-12",
                name: "核心部件与整机平台",
                children: [
                  {
                    id: "capitalgoods-20-13",
                    name: "能量与成形执行系统",
                    children: [
                      {
                        id: "capitalgoods-20-14",
                        name: "激光系统"
                      },
                      {
                        id: "capitalgoods-20-15",
                        name: "电子束系统"
                      },
                      {
                        id: "capitalgoods-20-16",
                        name: "喷射头与喷嘴系统"
                      },
                      {
                        id: "capitalgoods-20-17",
                        name: "挤出头与螺杆系统"
                      },
                      {
                        id: "capitalgoods-20-18",
                        name: "电弧与超声执行系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-20-19",
                    name: "运动与成形机构",
                    children: [
                      {
                        id: "capitalgoods-20-20",
                        name: "振镜与光路系统"
                      },
                      {
                        id: "capitalgoods-20-21",
                        name: "多轴运动与扫描机构"
                      },
                      {
                        id: "capitalgoods-20-22",
                        name: "铺粉与刮刀机构"
                      },
                      {
                        id: "capitalgoods-20-23",
                        name: "料槽与成形仓"
                      },
                      {
                        id: "capitalgoods-20-24",
                        name: "真空与惰性气氛系统"
                      },
                      {
                        id: "capitalgoods-20-25",
                        name: "温控与冷却系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-20-26",
                    name: "设备整机类型",
                    children: [
                      {
                        id: "capitalgoods-20-27",
                        name: "粉床熔融装备",
                        children: [
                          {
                            id: "capitalgoods-20-28",
                            name: "金属激光粉床熔融装备"
                          },
                          {
                            id: "capitalgoods-20-29",
                            name: "电子束粉床熔融装备"
                          },
                          {
                            id: "capitalgoods-20-30",
                            name: "聚合物粉床熔融装备"
                          }
                        ]
                      },
                      {
                        id: "capitalgoods-20-31",
                        name: "定向能量沉积装备",
                        children: [
                          {
                            id: "capitalgoods-20-32",
                            name: "激光送粉装备"
                          },
                          {
                            id: "capitalgoods-20-33",
                            name: "激光送丝装备"
                          },
                          {
                            id: "capitalgoods-20-34",
                            name: "电弧增材装备"
                          },
                          {
                            id: "capitalgoods-20-35",
                            name: "电子束送丝装备"
                          }
                        ]
                      },
                      {
                        id: "capitalgoods-20-36",
                        name: "材料挤出装备",
                        children: [
                          {
                            id: "capitalgoods-20-37",
                            name: "线材挤出装备"
                          },
                          {
                            id: "capitalgoods-20-38",
                            name: "颗粒挤出装备"
                          }
                        ]
                      },
                      {
                        id: "capitalgoods-20-39",
                        name: "光固化装备",
                        children: [
                          {
                            id: "capitalgoods-20-40",
                            name: "SLA 装备"
                          },
                          {
                            id: "capitalgoods-20-41",
                            name: "DLP 与 LCD 装备"
                          },
                          {
                            id: "capitalgoods-20-42",
                            name: "连续光固化装备"
                          }
                        ]
                      },
                      {
                        id: "capitalgoods-20-43",
                        name: "喷射类装备",
                        children: [
                          {
                            id: "capitalgoods-20-44",
                            name: "材料喷射装备"
                          },
                          {
                            id: "capitalgoods-20-45",
                            name: "粘结剂喷射装备"
                          }
                        ]
                      },
                      {
                        id: "capitalgoods-20-46",
                        name: "叠层与复合成形装备",
                        children: [
                          {
                            id: "capitalgoods-20-47",
                            name: "薄材叠层装备"
                          },
                          {
                            id: "capitalgoods-20-48",
                            name: "超声增材装备"
                          },
                          {
                            id: "capitalgoods-20-49",
                            name: "混合增减材装备"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-20-50",
                name: "制造验证与产线配套",
                children: [
                  {
                    id: "capitalgoods-20-51",
                    name: "材料处理与供给",
                    children: [
                      {
                        id: "capitalgoods-20-52",
                        name: "金属粉末制备与筛分"
                      },
                      {
                        id: "capitalgoods-20-53",
                        name: "聚合物粉末处理"
                      },
                      {
                        id: "capitalgoods-20-54",
                        name: "光敏树脂处理"
                      },
                      {
                        id: "capitalgoods-20-55",
                        name: "丝材与颗粒供给"
                      },
                      {
                        id: "capitalgoods-20-56",
                        name: "送粉与送丝系统"
                      },
                      {
                        id: "capitalgoods-20-57",
                        name: "材料回收与循环系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-20-58",
                    name: "后处理装备",
                    children: [
                      {
                        id: "capitalgoods-20-59",
                        name: "去支撑与清粉装备"
                      },
                      {
                        id: "capitalgoods-20-60",
                        name: "脱脂与烧结装备"
                      },
                      {
                        id: "capitalgoods-20-61",
                        name: "热处理与热等静压装备"
                      },
                      {
                        id: "capitalgoods-20-62",
                        name: "表面处理与精整装备"
                      },
                      {
                        id: "capitalgoods-20-63",
                        name: "增材后机加工装备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-20-64",
                    name: "检测与认证装备",
                    children: [
                      {
                        id: "capitalgoods-20-65",
                        name: "原位监测系统"
                      },
                      {
                        id: "capitalgoods-20-66",
                        name: "尺寸检测与表面测量"
                      },
                      {
                        id: "capitalgoods-20-67",
                        name: "无损检测装备"
                      },
                      {
                        id: "capitalgoods-20-68",
                        name: "力学性能测试装备"
                      },
                      {
                        id: "capitalgoods-20-69",
                        name: "冶金与材料表征装备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-20-70",
                name: "应用场景与产业服务",
                children: [
                  {
                    id: "capitalgoods-20-71",
                    name: "行业应用",
                    children: [
                      {
                        id: "capitalgoods-20-72",
                        name: "航空航天"
                      },
                      {
                        id: "capitalgoods-20-73",
                        name: "医疗与齿科"
                      },
                      {
                        id: "capitalgoods-20-74",
                        name: "汽车与工业装备"
                      },
                      {
                        id: "capitalgoods-20-75",
                        name: "能源与电力"
                      },
                      {
                        id: "capitalgoods-20-76",
                        name: "模具与工具"
                      },
                      {
                        id: "capitalgoods-20-77",
                        name: "消费品与教育科研"
                      },
                      {
                        id: "capitalgoods-20-78",
                        name: "建筑与大尺寸构件"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-20-79",
                    name: "服务与运营",
                    children: [
                      {
                        id: "capitalgoods-20-80",
                        name: "打印服务与云制造"
                      },
                      {
                        id: "capitalgoods-20-81",
                        name: "工艺开发与验证服务"
                      },
                      {
                        id: "capitalgoods-20-82",
                        name: "设备运维与升级改造"
                      },
                      {
                        id: "capitalgoods-20-83",
                        name: "培训与应用导入"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-20-84",
                    name: "标准与产业组织",
                    children: [
                      {
                        id: "capitalgoods-20-85",
                        name: "ISO 与 ASTM 标准体系"
                      },
                      {
                        id: "capitalgoods-20-86",
                        name: "行业协会与创新平台"
                      },
                      {
                        id: "capitalgoods-20-87",
                        name: "认证与合规服务"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "capitalgoods-21",
            name: "电子元器件与机电组件设备",
            children: [
              {
                id: "capitalgoods-21-1",
                name: "关键基础与设备底座",
                children: [
                  {
                    id: "capitalgoods-21-2",
                    name: "工艺材料与耗材",
                    children: [
                      {
                        id: "capitalgoods-21-3",
                        name: "结构件与精密机加件"
                      },
                      {
                        id: "capitalgoods-21-4",
                        name: "真空与流体耗材"
                      },
                      {
                        id: "capitalgoods-21-5",
                        name: "工艺介质与化学品"
                      },
                      {
                        id: "capitalgoods-21-6",
                        name: "热处理与表面处理耗材"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-21-7",
                    name: "核心功能部件",
                    children: [
                      {
                        id: "capitalgoods-21-8",
                        name: "精密运动与传动单元"
                      },
                      {
                        id: "capitalgoods-21-9",
                        name: "视觉检测与传感单元"
                      },
                      {
                        id: "capitalgoods-21-10",
                        name: "工业控制与电气系统"
                      },
                      {
                        id: "capitalgoods-21-11",
                        name: "真空激光电源热工单元"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-21-12",
                    name: "软件与工艺能力",
                    children: [
                      {
                        id: "capitalgoods-21-13",
                        name: "设备控制软件"
                      },
                      {
                        id: "capitalgoods-21-14",
                        name: "配方与参数管理"
                      },
                      {
                        id: "capitalgoods-21-15",
                        name: "数据采集与追溯系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-21-16",
                name: "工艺装备与产线系统",
                children: [
                  {
                    id: "capitalgoods-21-17",
                    name: "片式元器件装备",
                    children: [
                      {
                        id: "capitalgoods-21-18",
                        name: "配料球磨与制浆设备"
                      },
                      {
                        id: "capitalgoods-21-19",
                        name: "流延印刷与叠层设备"
                      },
                      {
                        id: "capitalgoods-21-20",
                        name: "脱胶烧结与电极形成设备"
                      },
                      {
                        id: "capitalgoods-21-21",
                        name: "切割分选与电测设备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-21-22",
                    name: "频率器件与传感器装备",
                    children: [
                      {
                        id: "capitalgoods-21-23",
                        name: "晶体加工与频率调校设备"
                      },
                      {
                        id: "capitalgoods-21-24",
                        name: "薄膜沉积与微结构加工设备"
                      },
                      {
                        id: "capitalgoods-21-25",
                        name: "封装固化与标定测试设备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-21-26",
                    name: "PCB与电子电路装备",
                    children: [
                      {
                        id: "capitalgoods-21-27",
                        name: "钻孔与图形转移设备"
                      },
                      {
                        id: "capitalgoods-21-28",
                        name: "电镀蚀刻与表面处理设备"
                      },
                      {
                        id: "capitalgoods-21-29",
                        name: "压合阻焊与字符设备"
                      },
                      {
                        id: "capitalgoods-21-30",
                        name: "AOI电测与可靠性测试设备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-21-31",
                    name: "电声与连接组件装备",
                    children: [
                      {
                        id: "capitalgoods-21-32",
                        name: "绕线成型与冲压设备"
                      },
                      {
                        id: "capitalgoods-21-33",
                        name: "焊接装配与点胶设备"
                      },
                      {
                        id: "capitalgoods-21-34",
                        name: "注塑封装与整机测试设备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-21-35",
                    name: "锂电与储能组件装备",
                    children: [
                      {
                        id: "capitalgoods-21-36",
                        name: "搅拌供浆与涂布设备"
                      },
                      {
                        id: "capitalgoods-21-37",
                        name: "辊压分切与制片设备"
                      },
                      {
                        id: "capitalgoods-21-38",
                        name: "卷绕叠片与极耳焊接设备"
                      },
                      {
                        id: "capitalgoods-21-39",
                        name: "注液封装与化成分容设备"
                      },
                      {
                        id: "capitalgoods-21-40",
                        name: "模组与PACK装配设备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-21-41",
                name: "下游产品与应用牵引",
                children: [
                  {
                    id: "capitalgoods-21-42",
                    name: "元器件制造客户",
                    children: [
                      {
                        id: "capitalgoods-21-43",
                        name: "电容电阻电感企业"
                      },
                      {
                        id: "capitalgoods-21-44",
                        name: "频率器件与传感器企业"
                      },
                      {
                        id: "capitalgoods-21-45",
                        name: "PCB与电子电路企业"
                      },
                      {
                        id: "capitalgoods-21-46",
                        name: "连接器继电器与电声组件企业"
                      },
                      {
                        id: "capitalgoods-21-47",
                        name: "锂电池与储能组件企业"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-21-48",
                    name: "终端应用领域",
                    children: [
                      {
                        id: "capitalgoods-21-49",
                        name: "消费电子与计算设备"
                      },
                      {
                        id: "capitalgoods-21-50",
                        name: "通信设备与数据中心"
                      },
                      {
                        id: "capitalgoods-21-51",
                        name: "汽车电子与新能源车"
                      },
                      {
                        id: "capitalgoods-21-52",
                        name: "工业控制与能源电力"
                      },
                      {
                        id: "capitalgoods-21-53",
                        name: "医疗安防与高可靠装备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-21-54",
                    name: "需求演进方向",
                    children: [
                      {
                        id: "capitalgoods-21-55",
                        name: "高密度小型化"
                      },
                      {
                        id: "capitalgoods-21-56",
                        name: "高速高频与高功率"
                      },
                      {
                        id: "capitalgoods-21-57",
                        name: "高可靠与车规化"
                      },
                      {
                        id: "capitalgoods-21-58",
                        name: "自动化与柔性化"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-21-59",
                name: "工程服务与产业生态",
                children: [
                  {
                    id: "capitalgoods-21-60",
                    name: "工厂建设与交付",
                    children: [
                      {
                        id: "capitalgoods-21-61",
                        name: "洁净厂房与公辅系统"
                      },
                      {
                        id: "capitalgoods-21-62",
                        name: "产线集成与调试验证"
                      },
                      {
                        id: "capitalgoods-21-63",
                        name: "测试认证与质量工程"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-21-64",
                    name: "运行维护与升级",
                    children: [
                      {
                        id: "capitalgoods-21-65",
                        name: "备件维保与技改升级"
                      },
                      {
                        id: "capitalgoods-21-66",
                        name: "良率提升与节能降耗"
                      },
                      {
                        id: "capitalgoods-21-67",
                        name: "数字化改造与远程运维"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-21-68",
                    name: "循环利用与环保治理",
                    children: [
                      {
                        id: "capitalgoods-21-69",
                        name: "电池回收再利用装备"
                      },
                      {
                        id: "capitalgoods-21-70",
                        name: "设备翻新与再制造"
                      },
                      {
                        id: "capitalgoods-21-71",
                        name: "废液废气与环保处理"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "capitalgoods-22",
            name: "电池智能制造装备",
            children: [
              {
                id: "capitalgoods-22-1",
                name: "关键部件与工业底座",
                children: [
                  {
                    id: "capitalgoods-22-2",
                    name: "工艺环境与公用工程",
                    children: [
                      {
                        id: "capitalgoods-22-3",
                        name: "干燥房与洁净环境"
                      },
                      {
                        id: "capitalgoods-22-4",
                        name: "真空与温控系统"
                      },
                      {
                        id: "capitalgoods-22-5",
                        name: "NMP 回收与废气治理"
                      },
                      {
                        id: "capitalgoods-22-6",
                        name: "压缩空气、制氮、纯水与电力配套"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-22-7",
                    name: "核心零部件与执行单元",
                    children: [
                      {
                        id: "capitalgoods-22-8",
                        name: "涂布模头与精密辊系"
                      },
                      {
                        id: "capitalgoods-22-9",
                        name: "泵阀、流量、计量与供液单元"
                      },
                      {
                        id: "capitalgoods-22-10",
                        name: "伺服、张力控制与直线运动系统"
                      },
                      {
                        id: "capitalgoods-22-11",
                        name: "激光、超声与焊接电源系统"
                      },
                      {
                        id: "capitalgoods-22-12",
                        name: "刀具模具、治具夹具与精密传动件"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-22-13",
                    name: "感知控制与工业软件",
                    children: [
                      {
                        id: "capitalgoods-22-14",
                        name: "PLC、IPC 与运动控制器"
                      },
                      {
                        id: "capitalgoods-22-15",
                        name: "机器视觉与在线检测传感器"
                      },
                      {
                        id: "capitalgoods-22-16",
                        name: "SCADA、MES 与设备管理系统"
                      },
                      {
                        id: "capitalgoods-22-17",
                        name: "数字孪生与工艺仿真平台"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-22-18",
                name: "核心装备与制造单元",
                children: [
                  {
                    id: "capitalgoods-22-19",
                    name: "电极制备装备",
                    children: [
                      {
                        id: "capitalgoods-22-20",
                        name: "配料与匀浆设备"
                      },
                      {
                        id: "capitalgoods-22-21",
                        name: "涂布与烘干设备"
                      },
                      {
                        id: "capitalgoods-22-22",
                        name: "辊压与分切设备"
                      },
                      {
                        id: "capitalgoods-22-23",
                        name: "极片模切与制片设备"
                      },
                      {
                        id: "capitalgoods-22-24",
                        name: "干法电极成形设备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-22-25",
                    name: "电芯装配装备",
                    children: [
                      {
                        id: "capitalgoods-22-26",
                        name: "卷绕设备"
                      },
                      {
                        id: "capitalgoods-22-27",
                        name: "叠片设备"
                      },
                      {
                        id: "capitalgoods-22-28",
                        name: "极耳成形与焊接设备"
                      },
                      {
                        id: "capitalgoods-22-29",
                        name: "入壳与封装设备"
                      },
                      {
                        id: "capitalgoods-22-30",
                        name: "注液、浸润与封口设备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-22-31",
                    name: "化成分容与后段装备",
                    children: [
                      {
                        id: "capitalgoods-22-32",
                        name: "化成设备"
                      },
                      {
                        id: "capitalgoods-22-33",
                        name: "老化陈化设备"
                      },
                      {
                        id: "capitalgoods-22-34",
                        name: "分容分选设备"
                      },
                      {
                        id: "capitalgoods-22-35",
                        name: "OCV、内阻、气密与外观检测设备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-22-36",
                    name: "模组 PACK 与回收拆解装备",
                    children: [
                      {
                        id: "capitalgoods-22-37",
                        name: "模组装配与连接设备"
                      },
                      {
                        id: "capitalgoods-22-38",
                        name: "PACK 总装与 EOL 测试设备"
                      },
                      {
                        id: "capitalgoods-22-39",
                        name: "安全放电与拆解设备"
                      },
                      {
                        id: "capitalgoods-22-40",
                        name: "梯次利用预处理装备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-22-41",
                name: "产线集成与智能工厂",
                children: [
                  {
                    id: "capitalgoods-22-42",
                    name: "产线集成与物流自动化",
                    children: [
                      {
                        id: "capitalgoods-22-43",
                        name: "单机联线与整线集成"
                      },
                      {
                        id: "capitalgoods-22-44",
                        name: "AGV、AMR、立库与缓存系统"
                      },
                      {
                        id: "capitalgoods-22-45",
                        name: "条码、RFID 与全流程追溯系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-22-46",
                    name: "质量控制与工艺优化",
                    children: [
                      {
                        id: "capitalgoods-22-47",
                        name: "在线缺陷检测系统"
                      },
                      {
                        id: "capitalgoods-22-48",
                        name: "SPC、FDC 与良率管理系统"
                      },
                      {
                        id: "capitalgoods-22-49",
                        name: "预测维护与设备健康管理"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-22-50",
                    name: "工厂建设与运维服务",
                    children: [
                      {
                        id: "capitalgoods-22-51",
                        name: "厂务与公用工程集成"
                      },
                      {
                        id: "capitalgoods-22-52",
                        name: "调试验证与量产爬坡服务"
                      },
                      {
                        id: "capitalgoods-22-53",
                        name: "备件、维保与升级改造服务"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-22-54",
                name: "应用适配与产业生态",
                children: [
                  {
                    id: "capitalgoods-22-55",
                    name: "电池产品与工艺适配",
                    children: [
                      {
                        id: "capitalgoods-22-56",
                        name: "动力电池产线"
                      },
                      {
                        id: "capitalgoods-22-57",
                        name: "储能电池产线"
                      },
                      {
                        id: "capitalgoods-22-58",
                        name: "消费与小动力电池产线"
                      },
                      {
                        id: "capitalgoods-22-59",
                        name: "半固态与固态电池产线"
                      },
                      {
                        id: "capitalgoods-22-60",
                        name: "钠离子电池产线"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-22-61",
                    name: "产业协同与规范环境",
                    children: [
                      {
                        id: "capitalgoods-22-62",
                        name: "设备验证与客户导入"
                      },
                      {
                        id: "capitalgoods-22-63",
                        name: "安全环保与法规符合"
                      },
                      {
                        id: "capitalgoods-22-64",
                        name: "标准测试与认证协同"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "capitalgoods-23",
            name: "船用配套设备",
            children: [
              {
                id: "capitalgoods-23-1",
                name: "动力推进与机舱系统",
                children: [
                  {
                    id: "capitalgoods-23-2",
                    name: "主推进动力",
                    children: [
                      {
                        id: "capitalgoods-23-3",
                        name: "低速二冲程主机"
                      },
                      {
                        id: "capitalgoods-23-4",
                        name: "中高速四冲程主机"
                      },
                      {
                        id: "capitalgoods-23-5",
                        name: "双燃料与替代燃料主机"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-23-6",
                    name: "推进与传动装置",
                    children: [
                      {
                        id: "capitalgoods-23-7",
                        name: "螺旋桨与可调桨"
                      },
                      {
                        id: "capitalgoods-23-8",
                        name: "轴系与轴承密封"
                      },
                      {
                        id: "capitalgoods-23-9",
                        name: "齿轮箱与离合器"
                      },
                      {
                        id: "capitalgoods-23-10",
                        name: "侧推器与全回转推进器"
                      },
                      {
                        id: "capitalgoods-23-11",
                        name: "吊舱推进装置"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-23-12",
                    name: "辅机与机舱公用设备",
                    children: [
                      {
                        id: "capitalgoods-23-13",
                        name: "发电机组与轴带发电"
                      },
                      {
                        id: "capitalgoods-23-14",
                        name: "锅炉与废热回收"
                      },
                      {
                        id: "capitalgoods-23-15",
                        name: "泵阀与压缩空气系统"
                      },
                      {
                        id: "capitalgoods-23-16",
                        name: "换热冷却设备"
                      },
                      {
                        id: "capitalgoods-23-17",
                        name: "润滑与燃油处理设备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-23-18",
                    name: "机舱控制与节能装备",
                    children: [
                      {
                        id: "capitalgoods-23-19",
                        name: "主机遥控与推进控制"
                      },
                      {
                        id: "capitalgoods-23-20",
                        name: "能源管理系统"
                      },
                      {
                        id: "capitalgoods-23-21",
                        name: "混合动力与储能接口"
                      },
                      {
                        id: "capitalgoods-23-22",
                        name: "船岸监测与诊断系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-23-23",
                name: "甲板作业与舱室系统",
                children: [
                  {
                    id: "capitalgoods-23-24",
                    name: "甲板机械与操纵设备",
                    children: [
                      {
                        id: "capitalgoods-23-25",
                        name: "锚机与绞车"
                      },
                      {
                        id: "capitalgoods-23-26",
                        name: "系泊与拖带设备"
                      },
                      {
                        id: "capitalgoods-23-27",
                        name: "舵机与操舵装置"
                      },
                      {
                        id: "capitalgoods-23-28",
                        name: "起重与吊装设备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-23-29",
                    name: "货运与作业保障设备",
                    children: [
                      {
                        id: "capitalgoods-23-30",
                        name: "舱口盖与液压装置"
                      },
                      {
                        id: "capitalgoods-23-31",
                        name: "压载与装卸泵组"
                      },
                      {
                        id: "capitalgoods-23-32",
                        name: "管系与阀件成套"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-23-33",
                    name: "舱室与生活保障设备",
                    children: [
                      {
                        id: "capitalgoods-23-34",
                        name: "空调通风与制冷"
                      },
                      {
                        id: "capitalgoods-23-35",
                        name: "淡水制备与供水设备"
                      },
                      {
                        id: "capitalgoods-23-36",
                        name: "卫生与污水收集设备"
                      },
                      {
                        id: "capitalgoods-23-37",
                        name: "厨房洗衣与内装配套"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-23-38",
                    name: "船体附属与舾装设备",
                    children: [
                      {
                        id: "capitalgoods-23-39",
                        name: "门窗盖与舷梯设备"
                      },
                      {
                        id: "capitalgoods-23-40",
                        name: "舱室防火与保温装置"
                      },
                      {
                        id: "capitalgoods-23-41",
                        name: "登离船与通道装备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-23-42",
                name: "电气控制与航行信息系统",
                children: [
                  {
                    id: "capitalgoods-23-43",
                    name: "船舶电站与配电系统",
                    children: [
                      {
                        id: "capitalgoods-23-44",
                        name: "主配电板与分配电设备"
                      },
                      {
                        id: "capitalgoods-23-45",
                        name: "变压器与变频驱动"
                      },
                      {
                        id: "capitalgoods-23-46",
                        name: "岸电接口与电能变换"
                      },
                      {
                        id: "capitalgoods-23-47",
                        name: "电池储能与燃料电池接口"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-23-48",
                    name: "自动化与集成控制系统",
                    children: [
                      {
                        id: "capitalgoods-23-49",
                        name: "机舱自动化系统"
                      },
                      {
                        id: "capitalgoods-23-50",
                        name: "电力管理系统"
                      },
                      {
                        id: "capitalgoods-23-51",
                        name: "动态定位与操纵控制"
                      },
                      {
                        id: "capitalgoods-23-52",
                        name: "数据采集与船岸通信网关"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-23-53",
                    name: "驾驶台与导航感知系统",
                    children: [
                      {
                        id: "capitalgoods-23-54",
                        name: "雷达与电子海图系统"
                      },
                      {
                        id: "capitalgoods-23-55",
                        name: "AIS 与卫星定位系统"
                      },
                      {
                        id: "capitalgoods-23-56",
                        name: "罗经计程仪与测深设备"
                      },
                      {
                        id: "capitalgoods-23-57",
                        name: "自动舵与航向控制设备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-23-58",
                    name: "通信与信息安全系统",
                    children: [
                      {
                        id: "capitalgoods-23-59",
                        name: "GMDSS 与卫星通信"
                      },
                      {
                        id: "capitalgoods-23-60",
                        name: "船载局域网络与交换设备"
                      },
                      {
                        id: "capitalgoods-23-61",
                        name: "网络安全与冗余容错装置"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-23-62",
                name: "安全环保与特种保障系统",
                children: [
                  {
                    id: "capitalgoods-23-63",
                    name: "安全与应急设备",
                    children: [
                      {
                        id: "capitalgoods-23-64",
                        name: "火灾探测与报警系统"
                      },
                      {
                        id: "capitalgoods-23-65",
                        name: "固定灭火系统"
                      },
                      {
                        id: "capitalgoods-23-66",
                        name: "气体检测与防爆装置"
                      },
                      {
                        id: "capitalgoods-23-67",
                        name: "救生艇筏与降放设备"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-23-68",
                    name: "污染防治与环保设备",
                    children: [
                      {
                        id: "capitalgoods-23-69",
                        name: "压载水处理系统"
                      },
                      {
                        id: "capitalgoods-23-70",
                        name: "油水分离与舱底水处理"
                      },
                      {
                        id: "capitalgoods-23-71",
                        name: "生活污水与垃圾处理"
                      },
                      {
                        id: "capitalgoods-23-72",
                        name: "脱硫脱硝与颗粒物治理"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-23-73",
                    name: "低碳改造与新型保障装备",
                    children: [
                      {
                        id: "capitalgoods-23-74",
                        name: "船载碳捕集装置"
                      },
                      {
                        id: "capitalgoods-23-75",
                        name: "风助推与节能附体装备"
                      },
                      {
                        id: "capitalgoods-23-76",
                        name: "绿色燃料供给与处理设备"
                      },
                      {
                        id: "capitalgoods-23-77",
                        name: "能效监测与碳管理系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-23-78",
                    name: "检验认证与运维保障",
                    children: [
                      {
                        id: "capitalgoods-23-79",
                        name: "船级社检验与型式认可"
                      },
                      {
                        id: "capitalgoods-23-80",
                        name: "安装调试与系统集成服务"
                      },
                      {
                        id: "capitalgoods-23-81",
                        name: "备件供应与改装升级服务"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "capitalgoods-24",
            name: "潜水装备",
            children: [
              {
                id: "capitalgoods-24-1",
                name: "核心材料与基础部件",
                children: [
                  {
                    id: "capitalgoods-24-2",
                    name: "金属与压力承载材料",
                    children: [
                      {
                        id: "capitalgoods-24-3",
                        name: "铝合金与钢制气瓶材料"
                      },
                      {
                        id: "capitalgoods-24-4",
                        name: "钛合金与不锈钢阀件材料"
                      },
                      {
                        id: "capitalgoods-24-5",
                        name: "工程塑料与高强复合材料"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-24-6",
                    name: "密封与气路部件",
                    children: [
                      {
                        id: "capitalgoods-24-7",
                        name: "一级减压器核心部件"
                      },
                      {
                        id: "capitalgoods-24-8",
                        name: "二级供气与备用供气部件"
                      },
                      {
                        id: "capitalgoods-24-9",
                        name: "高压阀门与接头总成"
                      },
                      {
                        id: "capitalgoods-24-10",
                        name: "软管、单向阀与排气阀"
                      },
                      {
                        id: "capitalgoods-24-11",
                        name: "O形圈、密封圈与防水连接器"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-24-12",
                    name: "防护与穿戴材料",
                    children: [
                      {
                        id: "capitalgoods-24-13",
                        name: "氯丁橡胶片材与复合面料"
                      },
                      {
                        id: "capitalgoods-24-14",
                        name: "干式服防水透湿材料"
                      },
                      {
                        id: "capitalgoods-24-15",
                        name: "保温内胆、头套、手套与靴材"
                      },
                      {
                        id: "capitalgoods-24-16",
                        name: "面镜镜片、裙边与防雾涂层"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-24-17",
                    name: "电子与传感器件",
                    children: [
                      {
                        id: "capitalgoods-24-18",
                        name: "深度压力与气体传感器"
                      },
                      {
                        id: "capitalgoods-24-19",
                        name: "氧传感器与二氧化碳吸收材料"
                      },
                      {
                        id: "capitalgoods-24-20",
                        name: "控制板、显示模组与电池系统"
                      },
                      {
                        id: "capitalgoods-24-21",
                        name: "水下照明、通信与声学器件"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-24-22",
                name: "个体潜水装备与生命支持系统",
                children: [
                  {
                    id: "capitalgoods-24-23",
                    name: "开路水肺系统",
                    children: [
                      {
                        id: "capitalgoods-24-24",
                        name: "气瓶与阀组"
                      },
                      {
                        id: "capitalgoods-24-25",
                        name: "一级头、二级头与备用气源"
                      },
                      {
                        id: "capitalgoods-24-26",
                        name: "压力表、仪表与呼吸管路"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-24-27",
                    name: "循环呼吸系统",
                    children: [
                      {
                        id: "capitalgoods-24-28",
                        name: "半闭路循环呼吸器"
                      },
                      {
                        id: "capitalgoods-24-29",
                        name: "闭路循环呼吸器"
                      },
                      {
                        id: "capitalgoods-24-30",
                        name: "洗涤罐、反肺与氧气控制单元"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-24-31",
                    name: "浮力与承载系统",
                    children: [
                      {
                        id: "capitalgoods-24-32",
                        name: "BCD与翼型浮力装置"
                      },
                      {
                        id: "capitalgoods-24-33",
                        name: "背板背带与瓶固定系统"
                      },
                      {
                        id: "capitalgoods-24-34",
                        name: "配重与快卸系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-24-35",
                    name: "暴露防护与行动装备",
                    children: [
                      {
                        id: "capitalgoods-24-36",
                        name: "湿式潜水服"
                      },
                      {
                        id: "capitalgoods-24-37",
                        name: "干式潜水服"
                      },
                      {
                        id: "capitalgoods-24-38",
                        name: "面镜、全面罩与脚蹼"
                      },
                      {
                        id: "capitalgoods-24-39",
                        name: "潜水推进器与水面浮具"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-24-40",
                    name: "监测与安全附件",
                    children: [
                      {
                        id: "capitalgoods-24-41",
                        name: "潜水电脑表、深度计与罗盘"
                      },
                      {
                        id: "capitalgoods-24-42",
                        name: "水下灯、摄像与导航附件"
                      },
                      {
                        id: "capitalgoods-24-43",
                        name: "延迟标记浮标、卷线轮与刀具"
                      },
                      {
                        id: "capitalgoods-24-44",
                        name: "备用面镜、急救氧与信号装置"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-24-45",
                name: "专业作业与平台配套装备",
                children: [
                  {
                    id: "capitalgoods-24-46",
                    name: "商业潜水个人装备",
                    children: [
                      {
                        id: "capitalgoods-24-47",
                        name: "商业潜水头盔与全面罩"
                      },
                      {
                        id: "capitalgoods-24-48",
                        name: "脐带缆、热水服与加热系统"
                      },
                      {
                        id: "capitalgoods-24-49",
                        name: "工作级切割、焊接与作业工具"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-24-50",
                    name: "水面供气与控制系统",
                    children: [
                      {
                        id: "capitalgoods-24-51",
                        name: "面板、减压架与气体管理系统"
                      },
                      {
                        id: "capitalgoods-24-52",
                        name: "压缩机、增压机与高压储气"
                      },
                      {
                        id: "capitalgoods-24-53",
                        name: "作业控制台与通信记录系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-24-54",
                    name: "高压与饱和潜水系统",
                    children: [
                      {
                        id: "capitalgoods-24-55",
                        name: "双闸高压舱与甲板减压舱"
                      },
                      {
                        id: "capitalgoods-24-56",
                        name: "潜水钟与收放系统"
                      },
                      {
                        id: "capitalgoods-24-57",
                        name: "救生钟与高压逃生生命支持包"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-24-58",
                    name: "检测维保与检验认证",
                    children: [
                      {
                        id: "capitalgoods-24-59",
                        name: "气瓶检测与水压试验"
                      },
                      {
                        id: "capitalgoods-24-60",
                        name: "调节器与阀件维保"
                      },
                      {
                        id: "capitalgoods-24-61",
                        name: "系统巡检、校准与备件服务"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-24-62",
                name: "制造服务与应用生态",
                children: [
                  {
                    id: "capitalgoods-24-63",
                    name: "制造与集成",
                    children: [
                      {
                        id: "capitalgoods-24-64",
                        name: "精密机加工与压力容器制造"
                      },
                      {
                        id: "capitalgoods-24-65",
                        name: "注塑、橡胶成型与缝制贴合"
                      },
                      {
                        id: "capitalgoods-24-66",
                        name: "整机装配、密封测试与压力测试"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-24-67",
                    name: "品牌与渠道",
                    children: [
                      {
                        id: "capitalgoods-24-68",
                        name: "专业品牌商与OEMODM"
                      },
                      {
                        id: "capitalgoods-24-69",
                        name: "潜店、经销与电商零售"
                      },
                      {
                        id: "capitalgoods-24-70",
                        name: "租赁、售后与二手流通"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-24-71",
                    name: "应用场景",
                    children: [
                      {
                        id: "capitalgoods-24-72",
                        name: "休闲潜水与培训配套"
                      },
                      {
                        id: "capitalgoods-24-73",
                        name: "技术潜水与洞穴沉船潜水"
                      },
                      {
                        id: "capitalgoods-24-74",
                        name: "工程潜水、海工与打捞"
                      },
                      {
                        id: "capitalgoods-24-75",
                        name: "科研潜水、公共安全与救援"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "capitalgoods-25",
            name: "水下救捞装备",
            children: [
              {
                id: "capitalgoods-25-1",
                name: "材料与关键部件",
                children: [
                  {
                    id: "capitalgoods-25-2",
                    name: "耐压与结构材料",
                    children: [
                      {
                        id: "capitalgoods-25-3",
                        name: "特种钢材与不锈钢"
                      },
                      {
                        id: "capitalgoods-25-4",
                        name: "铝合金与钛合金"
                      },
                      {
                        id: "capitalgoods-25-5",
                        name: "复合材料与浮力材料"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-25-6",
                    name: "密封连接与传输部件",
                    children: [
                      {
                        id: "capitalgoods-25-7",
                        name: "水密连接器与穿舱件"
                      },
                      {
                        id: "capitalgoods-25-8",
                        name: "脐带缆与光电复合缆"
                      },
                      {
                        id: "capitalgoods-25-9",
                        name: "密封件与耐压阀组"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-25-10",
                    name: "机电液与控制部件",
                    children: [
                      {
                        id: "capitalgoods-25-11",
                        name: "推进器与电机驱动"
                      },
                      {
                        id: "capitalgoods-25-12",
                        name: "液压泵阀与执行机构"
                      },
                      {
                        id: "capitalgoods-25-13",
                        name: "机械手与末端工具接口"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-25-14",
                    name: "感知与测量核心器件",
                    children: [
                      {
                        id: "capitalgoods-25-15",
                        name: "声呐换能器与阵列"
                      },
                      {
                        id: "capitalgoods-25-16",
                        name: "水下摄像与照明模组"
                      },
                      {
                        id: "capitalgoods-25-17",
                        name: "惯导定位与压力深度传感器"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-25-18",
                name: "探测与作业单机",
                children: [
                  {
                    id: "capitalgoods-25-19",
                    name: "水下探测定位装备",
                    children: [
                      {
                        id: "capitalgoods-25-20",
                        name: "侧扫声呐与多波束声呐"
                      },
                      {
                        id: "capitalgoods-25-21",
                        name: "成像声呐与前视声呐"
                      },
                      {
                        id: "capitalgoods-25-22",
                        name: "磁力探测与水下定位系统"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-25-23",
                    name: "潜水与生命支持装备",
                    children: [
                      {
                        id: "capitalgoods-25-24",
                        name: "水面供气潜水装具"
                      },
                      {
                        id: "capitalgoods-25-25",
                        name: "减压舱与高压氧舱"
                      },
                      {
                        id: "capitalgoods-25-26",
                        name: "潜水钟与潜水吊笼"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-25-27",
                    name: "水下机器人装备",
                    children: [
                      {
                        id: "capitalgoods-25-28",
                        name: "观察级与作业级 ROV"
                      },
                      {
                        id: "capitalgoods-25-29",
                        name: "AUV 与搜索测绘机器人"
                      },
                      {
                        id: "capitalgoods-25-30",
                        name: "机械手与作业工具包"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-25-31",
                    name: "打捞与处置装备",
                    children: [
                      {
                        id: "capitalgoods-25-32",
                        name: "起吊气囊与吊索索具"
                      },
                      {
                        id: "capitalgoods-25-33",
                        name: "水下切割焊接与破拆装备"
                      },
                      {
                        id: "capitalgoods-25-34",
                        name: "抽排封堵清障与吸泥装备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-25-35",
                name: "系统集成与平台",
                children: [
                  {
                    id: "capitalgoods-25-36",
                    name: "船载与岸基集成系统",
                    children: [
                      {
                        id: "capitalgoods-25-37",
                        name: "饱和潜水系统"
                      },
                      {
                        id: "capitalgoods-25-38",
                        name: "ROV 布放回收系统"
                      },
                      {
                        id: "capitalgoods-25-39",
                        name: "水下作业控制台与任务软件"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-25-40",
                    name: "作业载体平台",
                    children: [
                      {
                        id: "capitalgoods-25-41",
                        name: "救捞船与打捞工程船"
                      },
                      {
                        id: "capitalgoods-25-42",
                        name: "潜水支持船与多功能工程船"
                      },
                      {
                        id: "capitalgoods-25-43",
                        name: "无人艇与应急辅助平台"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-25-44",
                    name: "组合解决方案",
                    children: [
                      {
                        id: "capitalgoods-25-45",
                        name: "探测定位一体化系统"
                      },
                      {
                        id: "capitalgoods-25-46",
                        name: "潜水 ROV 协同作业系统"
                      },
                      {
                        id: "capitalgoods-25-47",
                        name: "救援打捞与应急处置成套包"
                      }
                    ]
                  }
                ]
              },
              {
                id: "capitalgoods-25-48",
                name: "运行保障与应用",
                children: [
                  {
                    id: "capitalgoods-25-49",
                    name: "检测认证与训练",
                    children: [
                      {
                        id: "capitalgoods-25-50",
                        name: "船级社认证与设备检验"
                      },
                      {
                        id: "capitalgoods-25-51",
                        name: "潜水员与 ROV 操作培训"
                      },
                      {
                        id: "capitalgoods-25-52",
                        name: "安全标准与作业规范"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-25-53",
                    name: "运维保障与工程服务",
                    children: [
                      {
                        id: "capitalgoods-25-54",
                        name: "备件维修与改装升级"
                      },
                      {
                        id: "capitalgoods-25-55",
                        name: "应急仓储与快速动员"
                      },
                      {
                        id: "capitalgoods-25-56",
                        name: "方案设计与现场工程服务"
                      }
                    ]
                  },
                  {
                    id: "capitalgoods-25-57",
                    name: "典型应用场景",
                    children: [
                      {
                        id: "capitalgoods-25-58",
                        name: "失事船舶与沉物打捞"
                      },
                      {
                        id: "capitalgoods-25-59",
                        name: "港航桥隧与水工设施抢修"
                      },
                      {
                        id: "capitalgoods-25-60",
                        name: "海洋油气与海上风电水下作业"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  auto: {
    upstream: {
      label: "上游",
      root: {
        id: "auto-upstream",
        name: "汽车零部件与设备",
        children: [
          {
            id: "auto-26",
            name: "智能车载设备",
            children: [
              {
                id: "auto-26-1",
                name: "核心器件与软件底座",
                children: [
                  {
                    id: "auto-26-2",
                    name: "车规芯片与电子器件",
                    children: [
                      {
                        id: "auto-26-3",
                        name: "车载 SoC 与 AI 加速芯片"
                      },
                      {
                        id: "auto-26-4",
                        name: "MCU 与域控制芯片"
                      },
                      {
                        id: "auto-26-5",
                        name: "存储与安全芯片"
                      },
                      {
                        id: "auto-26-6",
                        name: "电源管理与接口芯片"
                      }
                    ]
                  },
                  {
                    id: "auto-26-7",
                    name: "感知与交互器件",
                    children: [
                      {
                        id: "auto-26-8",
                        name: "摄像头与图像传感器"
                      },
                      {
                        id: "auto-26-9",
                        name: "毫米波雷达与超声波器件"
                      },
                      {
                        id: "auto-26-10",
                        name: "惯导定位与音频器件"
                      },
                      {
                        id: "auto-26-11",
                        name: "车载显示与触控器件"
                      }
                    ]
                  },
                  {
                    id: "auto-26-12",
                    name: "连接与基础软件",
                    children: [
                      {
                        id: "auto-26-13",
                        name: "蜂窝通信与 V2X 模组"
                      },
                      {
                        id: "auto-26-14",
                        name: "蓝牙 Wi-Fi UWB 与数字钥匙器件"
                      },
                      {
                        id: "auto-26-15",
                        name: "车载操作系统与中间件"
                      },
                      {
                        id: "auto-26-16",
                        name: "OTA 与网络安全底座"
                      }
                    ]
                  }
                ]
              },
              {
                id: "auto-26-17",
                name: "终端产品与系统方案",
                children: [
                  {
                    id: "auto-26-18",
                    name: "智能座舱终端",
                    children: [
                      {
                        id: "auto-26-19",
                        name: "中控信息娱乐主机"
                      },
                      {
                        id: "auto-26-20",
                        name: "液晶仪表与副驾后排屏"
                      },
                      {
                        id: "auto-26-21",
                        name: "HUD 与 AR-HUD"
                      },
                      {
                        id: "auto-26-22",
                        name: "语音交互与多模态座舱单元"
                      }
                    ]
                  },
                  {
                    id: "auto-26-23",
                    name: "智能驾驶与监测终端",
                    children: [
                      {
                        id: "auto-26-24",
                        name: "ADAS 前视一体机"
                      },
                      {
                        id: "auto-26-25",
                        name: "DMS OMS 与行车记录终端"
                      },
                      {
                        id: "auto-26-26",
                        name: "环视泊车与电子后视镜"
                      },
                      {
                        id: "auto-26-27",
                        name: "车载传感融合单元"
                      }
                    ]
                  },
                  {
                    id: "auto-26-28",
                    name: "网联与控制终端",
                    children: [
                      {
                        id: "auto-26-29",
                        name: "T-Box 与车联网通信终端"
                      },
                      {
                        id: "auto-26-30",
                        name: "eCall 与高精定位终端"
                      },
                      {
                        id: "auto-26-31",
                        name: "数字钥匙与车载支付终端"
                      },
                      {
                        id: "auto-26-32",
                        name: "网关与域控制器"
                      }
                    ]
                  }
                ]
              },
              {
                id: "auto-26-33",
                name: "集成制造与验证体系",
                children: [
                  {
                    id: "auto-26-34",
                    name: "模组制造与硬件集成",
                    children: [
                      {
                        id: "auto-26-35",
                        name: "PCB FPC 与连接器线束"
                      },
                      {
                        id: "auto-26-36",
                        name: "摄像头 显示 HUD 模组"
                      },
                      {
                        id: "auto-26-37",
                        name: "天线 雷达 射频模组"
                      },
                      {
                        id: "auto-26-38",
                        name: "散热 结构件 与壳体"
                      }
                    ]
                  },
                  {
                    id: "auto-26-39",
                    name: "软件集成与系统适配",
                    children: [
                      {
                        id: "auto-26-40",
                        name: "E/E 架构集成"
                      },
                      {
                        id: "auto-26-41",
                        name: "座舱 驾舱 与网联系统协同"
                      },
                      {
                        id: "auto-26-42",
                        name: "软件刷写与 OTA 集成"
                      },
                      {
                        id: "auto-26-43",
                        name: "功能配置与版本管理"
                      }
                    ]
                  },
                  {
                    id: "auto-26-44",
                    name: "测试验证与质量保障",
                    children: [
                      {
                        id: "auto-26-45",
                        name: "EMC 环境 与可靠性测试"
                      },
                      {
                        id: "auto-26-46",
                        name: "功能安全与信息安全测试"
                      },
                      {
                        id: "auto-26-47",
                        name: "HIL SIL 与实车验证"
                      },
                      {
                        id: "auto-26-48",
                        name: "远程诊断与运维保障"
                      }
                    ]
                  }
                ]
              },
              {
                id: "auto-26-49",
                name: "应用场景与服务生态",
                children: [
                  {
                    id: "auto-26-50",
                    name: "前装配套市场",
                    children: [
                      {
                        id: "auto-26-51",
                        name: "乘用车智能座舱配置"
                      },
                      {
                        id: "auto-26-52",
                        name: "辅助驾驶与泊车配置"
                      },
                      {
                        id: "auto-26-53",
                        name: "商用车监管与车队终端"
                      }
                    ]
                  },
                  {
                    id: "auto-26-54",
                    name: "后装升级市场",
                    children: [
                      {
                        id: "auto-26-55",
                        name: "行车记录与安全监控设备"
                      },
                      {
                        id: "auto-26-56",
                        name: "车机互联与导航娱乐设备"
                      },
                      {
                        id: "auto-26-57",
                        name: "HUD 流媒体后视镜与升级终端"
                      }
                    ]
                  },
                  {
                    id: "auto-26-58",
                    name: "数据与增值服务",
                    children: [
                      {
                        id: "auto-26-59",
                        name: "导航地图与位置服务"
                      },
                      {
                        id: "auto-26-60",
                        name: "内容分发与应用生态"
                      },
                      {
                        id: "auto-26-61",
                        name: "订阅服务与远程运营"
                      },
                      {
                        id: "auto-26-62",
                        name: "数据闭环与模型迭代"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "auto-27",
            name: "汽车核心零部件",
            children: [
              {
                id: "auto-27-1",
                name: "动力与能量系统",
                children: [
                  {
                    id: "auto-27-2",
                    name: "内燃机与混动动力部件",
                    children: [
                      {
                        id: "auto-27-3",
                        name: "缸体缸盖与曲柄连杆机构"
                      },
                      {
                        id: "auto-27-4",
                        name: "配气机构与燃油喷射系统"
                      },
                      {
                        id: "auto-27-5",
                        name: "进排气、增压与尾气后处理部件"
                      },
                      {
                        id: "auto-27-6",
                        name: "润滑、冷却与密封部件"
                      }
                    ]
                  },
                  {
                    id: "auto-27-7",
                    name: "传动与驱动系统",
                    children: [
                      {
                        id: "auto-27-8",
                        name: "离合器与双质量飞轮"
                      },
                      {
                        id: "auto-27-9",
                        name: "手动、自动、双离合与混动变速箱"
                      },
                      {
                        id: "auto-27-10",
                        name: "齿轮、轴承、同步器与差速机构"
                      },
                      {
                        id: "auto-27-11",
                        name: "传动轴、新能源减速器与电桥"
                      }
                    ]
                  },
                  {
                    id: "auto-27-12",
                    name: "电动化核心部件",
                    children: [
                      {
                        id: "auto-27-13",
                        name: "动力电池电芯"
                      },
                      {
                        id: "auto-27-14",
                        name: "模组、PACK 与结构件"
                      },
                      {
                        id: "auto-27-15",
                        name: "电池管理系统 BMS"
                      },
                      {
                        id: "auto-27-16",
                        name: "驱动电机与电驱总成"
                      },
                      {
                        id: "auto-27-17",
                        name: "电机控制器、逆变器、OBC 与 DC/DC"
                      },
                      {
                        id: "auto-27-18",
                        name: "高压配电盒、熔断器与继电保护部件"
                      }
                    ]
                  },
                  {
                    id: "auto-27-19",
                    name: "热管理与能量管理",
                    children: [
                      {
                        id: "auto-27-20",
                        name: "电动压缩机与热泵总成"
                      },
                      {
                        id: "auto-27-21",
                        name: "换热器、冷却板与散热模块"
                      },
                      {
                        id: "auto-27-22",
                        name: "电子水泵、电子油泵与阀件"
                      },
                      {
                        id: "auto-27-23",
                        name: "冷媒管路、连接件与保温材料"
                      }
                    ]
                  }
                ]
              },
              {
                id: "auto-27-24",
                name: "底盘与车身系统",
                children: [
                  {
                    id: "auto-27-25",
                    name: "行驶与悬架系统",
                    children: [
                      {
                        id: "auto-27-26",
                        name: "弹簧、减振器与空气悬架"
                      },
                      {
                        id: "auto-27-27",
                        name: "控制臂、副车架与稳定杆"
                      },
                      {
                        id: "auto-27-28",
                        name: "轮毂轴承与轮端模块"
                      }
                    ]
                  },
                  {
                    id: "auto-27-29",
                    name: "制动与转向系统",
                    children: [
                      {
                        id: "auto-27-30",
                        name: "制动盘、制动鼓、卡钳与摩擦片"
                      },
                      {
                        id: "auto-27-31",
                        name: "真空助力、电子助力制动与驻车执行机构"
                      },
                      {
                        id: "auto-27-32",
                        name: "转向器、转向柱与 EPS"
                      },
                      {
                        id: "auto-27-33",
                        name: "制动管路、软管与阀体"
                      }
                    ]
                  },
                  {
                    id: "auto-27-34",
                    name: "车身结构与安全部件",
                    children: [
                      {
                        id: "auto-27-35",
                        name: "车身结构件与覆盖件"
                      },
                      {
                        id: "auto-27-36",
                        name: "保险杠、防撞梁与吸能结构件"
                      },
                      {
                        id: "auto-27-37",
                        name: "安全气囊、安全带与约束系统部件"
                      },
                      {
                        id: "auto-27-38",
                        name: "车门系统、闭锁系统与升降机构"
                      }
                    ]
                  },
                  {
                    id: "auto-27-39",
                    name: "内外饰与功能部件",
                    children: [
                      {
                        id: "auto-27-40",
                        name: "座椅总成、骨架与调节机构"
                      },
                      {
                        id: "auto-27-41",
                        name: "仪表板、门板、顶棚与内饰表皮"
                      },
                      {
                        id: "auto-27-42",
                        name: "车灯系统与光学模组"
                      },
                      {
                        id: "auto-27-43",
                        name: "汽车玻璃、天幕与后视镜"
                      },
                      {
                        id: "auto-27-44",
                        name: "雨刮洗涤与密封系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "auto-27-45",
                name: "电气与智能系统",
                children: [
                  {
                    id: "auto-27-46",
                    name: "车载电气基础件",
                    children: [
                      {
                        id: "auto-27-47",
                        name: "低压线束与高压线束"
                      },
                      {
                        id: "auto-27-48",
                        name: "连接器、端子与配电盒"
                      },
                      {
                        id: "auto-27-49",
                        name: "保险丝、继电器与小电机"
                      }
                    ]
                  },
                  {
                    id: "auto-27-50",
                    name: "电子电控与 E/E 架构",
                    children: [
                      {
                        id: "auto-27-51",
                        name: "ECU、DCU、CCU 与 ZCU"
                      },
                      {
                        id: "auto-27-52",
                        name: "动力域、底盘域、座舱域与车身域控制器"
                      },
                      {
                        id: "auto-27-53",
                        name: "车载操作系统与中间件支撑模块"
                      },
                      {
                        id: "auto-27-54",
                        name: "网关、以太网交换与 OTA 支撑模块"
                      }
                    ]
                  },
                  {
                    id: "auto-27-55",
                    name: "智能感知与驾驶辅助",
                    children: [
                      {
                        id: "auto-27-56",
                        name: "摄像头、毫米波雷达与超声波雷达"
                      },
                      {
                        id: "auto-27-57",
                        name: "激光雷达与惯性定位传感器"
                      },
                      {
                        id: "auto-27-58",
                        name: "ADAS 计算平台与融合控制单元"
                      }
                    ]
                  },
                  {
                    id: "auto-27-59",
                    name: "智能座舱与车载终端",
                    children: [
                      {
                        id: "auto-27-60",
                        name: "座舱域控制器"
                      },
                      {
                        id: "auto-27-61",
                        name: "显示模组、HUD 与触控交互模组"
                      },
                      {
                        id: "auto-27-62",
                        name: "T-Box、音响、麦克风与语音模组"
                      },
                      {
                        id: "auto-27-63",
                        name: "DMS、OMS 与舱内感知部件"
                      }
                    ]
                  }
                ]
              },
              {
                id: "auto-27-64",
                name: "基础材料、制造支撑与后市场",
                children: [
                  {
                    id: "auto-27-65",
                    name: "关键基础材料与通用件",
                    children: [
                      {
                        id: "auto-27-66",
                        name: "车规级芯片与功率半导体"
                      },
                      {
                        id: "auto-27-67",
                        name: "PCB、封装基板与电子制造服务"
                      },
                      {
                        id: "auto-27-68",
                        name: "轴承、密封件、紧固件与弹性元件"
                      },
                      {
                        id: "auto-27-69",
                        name: "铝镁合金、工程塑料、橡胶与摩擦材料"
                      }
                    ]
                  },
                  {
                    id: "auto-27-70",
                    name: "制造装备与测试验证",
                    children: [
                      {
                        id: "auto-27-71",
                        name: "压铸、锻造、冲压、焊接与注塑装备"
                      },
                      {
                        id: "auto-27-72",
                        name: "电机、电池与电控装配产线"
                      },
                      {
                        id: "auto-27-73",
                        name: "自动化装配、检测治具与试验台架"
                      },
                      {
                        id: "auto-27-74",
                        name: "EMC、环境、耐久与可靠性测试设备"
                      }
                    ]
                  },
                  {
                    id: "auto-27-75",
                    name: "后市场与再制造",
                    children: [
                      {
                        id: "auto-27-76",
                        name: "维修替换件与易损件"
                      },
                      {
                        id: "auto-27-77",
                        name: "再制造发动机、变速箱与转向器"
                      },
                      {
                        id: "auto-27-78",
                        name: "动力电池梯次利用与回收"
                      },
                      {
                        id: "auto-27-79",
                        name: "零部件流通与供应保障体系"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    midstream: {
      label: "中游",
      root: {
        id: "auto-midstream",
        name: "汽车制造商",
        children: [
          {
            id: "auto-28",
            name: "新能源车整车",
            children: [
              {
                id: "auto-28-1",
                name: "关键要素与核心部件",
                children: [
                  {
                    id: "auto-28-2",
                    name: "动力与电能系统",
                    children: [
                      {
                        id: "auto-28-3",
                        name: "动力电池系统"
                      },
                      {
                        id: "auto-28-4",
                        name: "电池管理系统"
                      },
                      {
                        id: "auto-28-5",
                        name: "高压配电系统"
                      },
                      {
                        id: "auto-28-6",
                        name: "车载充电与电能变换系统"
                      }
                    ]
                  },
                  {
                    id: "auto-28-7",
                    name: "电驱与底盘执行系统",
                    children: [
                      {
                        id: "auto-28-8",
                        name: "驱动电机"
                      },
                      {
                        id: "auto-28-9",
                        name: "电机控制器与功率电子"
                      },
                      {
                        id: "auto-28-10",
                        name: "电驱总成"
                      },
                      {
                        id: "auto-28-11",
                        name: "线控制动、线控转向与线控悬架"
                      }
                    ]
                  },
                  {
                    id: "auto-28-12",
                    name: "智能电子与车载软件",
                    children: [
                      {
                        id: "auto-28-13",
                        name: "域控制器与中央计算平台"
                      },
                      {
                        id: "auto-28-14",
                        name: "车载传感器与执行器"
                      },
                      {
                        id: "auto-28-15",
                        name: "车载操作系统与中间件"
                      },
                      {
                        id: "auto-28-16",
                        name: "车载通信、OTA 与网络安全"
                      }
                    ]
                  },
                  {
                    id: "auto-28-17",
                    name: "车身平台与热管理",
                    children: [
                      {
                        id: "auto-28-18",
                        name: "纯电平台"
                      },
                      {
                        id: "auto-28-19",
                        name: "插混与增程平台"
                      },
                      {
                        id: "auto-28-20",
                        name: "氢燃料电池整车平台"
                      },
                      {
                        id: "auto-28-21",
                        name: "白车身、轻量化结构与热管理系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "auto-28-22",
                name: "整车开发与制造集成",
                children: [
                  {
                    id: "auto-28-23",
                    name: "整车定义与工程开发",
                    children: [
                      {
                        id: "auto-28-24",
                        name: "车型规划与平台定义"
                      },
                      {
                        id: "auto-28-25",
                        name: "整车架构设计"
                      },
                      {
                        id: "auto-28-26",
                        name: "仿真开发与参数标定"
                      },
                      {
                        id: "auto-28-27",
                        name: "试验验证与法规适配"
                      }
                    ]
                  },
                  {
                    id: "auto-28-28",
                    name: "系统集成与供应协同",
                    children: [
                      {
                        id: "auto-28-29",
                        name: "三电系统集成"
                      },
                      {
                        id: "auto-28-30",
                        name: "电子电气架构集成"
                      },
                      {
                        id: "auto-28-31",
                        name: "智驾与座舱系统集成"
                      },
                      {
                        id: "auto-28-32",
                        name: "供应链与物流协同"
                      }
                    ]
                  },
                  {
                    id: "auto-28-33",
                    name: "智能制造与质量控制",
                    children: [
                      {
                        id: "auto-28-34",
                        name: "冲压"
                      },
                      {
                        id: "auto-28-35",
                        name: "焊装"
                      },
                      {
                        id: "auto-28-36",
                        name: "涂装"
                      },
                      {
                        id: "auto-28-37",
                        name: "总装"
                      },
                      {
                        id: "auto-28-38",
                        name: "电池包与电驱装配"
                      },
                      {
                        id: "auto-28-39",
                        name: "终检、路试与一致性验证"
                      }
                    ]
                  }
                ]
              },
              {
                id: "auto-28-40",
                name: "产品交付与运营协同",
                children: [
                  {
                    id: "auto-28-41",
                    name: "整车产品谱系",
                    children: [
                      {
                        id: "auto-28-42",
                        name: "纯电乘用车"
                      },
                      {
                        id: "auto-28-43",
                        name: "插电混动与增程乘用车"
                      },
                      {
                        id: "auto-28-44",
                        name: "纯电商用车"
                      },
                      {
                        id: "auto-28-45",
                        name: "氢燃料电池整车"
                      }
                    ]
                  },
                  {
                    id: "auto-28-46",
                    name: "销售交付与补能协同",
                    children: [
                      {
                        id: "auto-28-47",
                        name: "销售网络与终端交付"
                      },
                      {
                        id: "auto-28-48",
                        name: "交流充电与家充配套"
                      },
                      {
                        id: "auto-28-49",
                        name: "直流快充与超充适配"
                      },
                      {
                        id: "auto-28-50",
                        name: "换电兼容车型与站网协同"
                      },
                      {
                        id: "auto-28-51",
                        name: "车网互动准备"
                      }
                    ]
                  },
                  {
                    id: "auto-28-52",
                    name: "车联网与运营服务",
                    children: [
                      {
                        id: "auto-28-53",
                        name: "远程诊断与运维"
                      },
                      {
                        id: "auto-28-54",
                        name: "数据运营与用户服务"
                      },
                      {
                        id: "auto-28-55",
                        name: "车队管理与出行运营"
                      },
                      {
                        id: "auto-28-56",
                        name: "金融保险与残值管理"
                      }
                    ]
                  }
                ]
              },
              {
                id: "auto-28-57",
                name: "后市场与循环利用",
                children: [
                  {
                    id: "auto-28-58",
                    name: "售后服务与维保体系",
                    children: [
                      {
                        id: "auto-28-59",
                        name: "三电维修"
                      },
                      {
                        id: "auto-28-60",
                        name: "软件升级与功能开通"
                      },
                      {
                        id: "auto-28-61",
                        name: "备件供应与维修网络"
                      },
                      {
                        id: "auto-28-62",
                        name: "召回与质量闭环"
                      }
                    ]
                  },
                  {
                    id: "auto-28-63",
                    name: "动力电池梯次利用与回收",
                    children: [
                      {
                        id: "auto-28-64",
                        name: "退役评估"
                      },
                      {
                        id: "auto-28-65",
                        name: "梯次利用"
                      },
                      {
                        id: "auto-28-66",
                        name: "拆解回收"
                      },
                      {
                        id: "auto-28-67",
                        name: "材料再生"
                      }
                    ]
                  },
                  {
                    id: "auto-28-68",
                    name: "合规与环境治理",
                    children: [
                      {
                        id: "auto-28-69",
                        name: "电池溯源与回收责任"
                      },
                      {
                        id: "auto-28-70",
                        name: "碳足迹与 ESG 管理"
                      },
                      {
                        id: "auto-28-71",
                        name: "生产一致性管理"
                      },
                      {
                        id: "auto-28-72",
                        name: "数据安全与网络安全合规"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  medequip: {
    upstream: {
      label: "上游",
      root: {
        id: "medequip-upstream",
        name: "医疗保健设备",
        children: [
          {
            id: "medequip-29",
            name: "分子诊断设备",
            children: [
              {
                id: "medequip-29-1",
                name: "关键部件与专用配套",
                children: [
                  {
                    id: "medequip-29-2",
                    name: "核酸前处理与样本处理",
                    children: [
                      {
                        id: "medequip-29-3",
                        name: "样本裂解与纯化模块"
                      },
                      {
                        id: "medequip-29-4",
                        name: "磁珠法提取模块"
                      },
                      {
                        id: "medequip-29-5",
                        name: "移液与加样模块"
                      },
                      {
                        id: "medequip-29-6",
                        name: "离心与分离模块"
                      }
                    ]
                  },
                  {
                    id: "medequip-29-7",
                    name: "反应实施与控温检测",
                    children: [
                      {
                        id: "medequip-29-8",
                        name: "热循环与恒温控制模块"
                      },
                      {
                        id: "medequip-29-9",
                        name: "荧光激发与光学检测模块"
                      },
                      {
                        id: "medequip-29-10",
                        name: "数字分区与成像模块"
                      },
                      {
                        id: "medequip-29-11",
                        name: "电化学与信号采集模块"
                      }
                    ]
                  },
                  {
                    id: "medequip-29-12",
                    name: "结构件与电子控制",
                    children: [
                      {
                        id: "medequip-29-13",
                        name: "精密机械与机箱结构"
                      },
                      {
                        id: "medequip-29-14",
                        name: "泵阀管路与运动控制"
                      },
                      {
                        id: "medequip-29-15",
                        name: "主控板卡与嵌入式系统"
                      },
                      {
                        id: "medequip-29-16",
                        name: "显示交互与通信接口"
                      }
                    ]
                  },
                  {
                    id: "medequip-29-17",
                    name: "设备专用耗材与软件配套",
                    children: [
                      {
                        id: "medequip-29-18",
                        name: "反应卡匣与微流控芯片"
                      },
                      {
                        id: "medequip-29-19",
                        name: "反应板管与封膜耗材"
                      },
                      {
                        id: "medequip-29-20",
                        name: "校准品与质控品配套"
                      },
                      {
                        id: "medequip-29-21",
                        name: "分析软件与数据接口"
                      }
                    ]
                  }
                ]
              },
              {
                id: "medequip-29-22",
                name: "平台设备与系统方案",
                children: [
                  {
                    id: "medequip-29-23",
                    name: "实时 PCR 与核酸扩增平台",
                    children: [
                      {
                        id: "medequip-29-24",
                        name: "台式实时 PCR 系统"
                      },
                      {
                        id: "medequip-29-25",
                        name: "中高通量自动化 PCR 平台"
                      },
                      {
                        id: "medequip-29-26",
                        name: "多重 PCR 检测平台"
                      }
                    ]
                  },
                  {
                    id: "medequip-29-27",
                    name: "数字 PCR 平台",
                    children: [
                      {
                        id: "medequip-29-28",
                        name: "纳米板数字 PCR 系统"
                      },
                      {
                        id: "medequip-29-29",
                        name: "液滴数字 PCR 系统"
                      },
                      {
                        id: "medequip-29-30",
                        name: "高阶多重定量平台"
                      }
                    ]
                  },
                  {
                    id: "medequip-29-31",
                    name: "即时与样本到结果平台",
                    children: [
                      {
                        id: "medequip-29-32",
                        name: "模块化即时分子检测系统"
                      },
                      {
                        id: "medequip-29-33",
                        name: "单样本快速检测平台"
                      },
                      {
                        id: "medequip-29-34",
                        name: "综合征联检平台"
                      }
                    ]
                  },
                  {
                    id: "medequip-29-35",
                    name: "临床 NGS 与扩展型分子检测平台",
                    children: [
                      {
                        id: "medequip-29-36",
                        name: "临床台式测序系统"
                      },
                      {
                        id: "medequip-29-37",
                        name: "端到端自动化测序系统"
                      },
                      {
                        id: "medequip-29-38",
                        name: "文库制备与上机一体化系统"
                      }
                    ]
                  },
                  {
                    id: "medequip-29-39",
                    name: "支撑自动化与信息系统",
                    children: [
                      {
                        id: "medequip-29-40",
                        name: "前处理自动化工作站"
                      },
                      {
                        id: "medequip-29-41",
                        name: "实验室信息与连接系统"
                      },
                      {
                        id: "medequip-29-42",
                        name: "远程运维与质量管理系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "medequip-29-43",
                name: "制造注册与服务交付",
                children: [
                  {
                    id: "medequip-29-44",
                    name: "研发设计与工程化",
                    children: [
                      {
                        id: "medequip-29-45",
                        name: "仪器架构设计"
                      },
                      {
                        id: "medequip-29-46",
                        name: "模块选型与集成开发"
                      },
                      {
                        id: "medequip-29-47",
                        name: "可制造性与可靠性设计"
                      }
                    ]
                  },
                  {
                    id: "medequip-29-48",
                    name: "生产制造与质量控制",
                    children: [
                      {
                        id: "medequip-29-49",
                        name: "关键模块装配调试"
                      },
                      {
                        id: "medequip-29-50",
                        name: "整机校准与性能验证"
                      },
                      {
                        id: "medequip-29-51",
                        name: "质量体系与放行检验"
                      }
                    ]
                  },
                  {
                    id: "medequip-29-52",
                    name: "注册认证与市场准入",
                    children: [
                      {
                        id: "medequip-29-53",
                        name: "医疗器械注册申报"
                      },
                      {
                        id: "medequip-29-54",
                        name: "分析性能与临床评价"
                      },
                      {
                        id: "medequip-29-55",
                        name: "国内外合规认证"
                      }
                    ]
                  },
                  {
                    id: "medequip-29-56",
                    name: "安装运维与商业交付",
                    children: [
                      {
                        id: "medequip-29-57",
                        name: "装机培训与售后服务"
                      },
                      {
                        id: "medequip-29-58",
                        name: "试剂菜单导入与升级"
                      },
                      {
                        id: "medequip-29-59",
                        name: "长周期维保与备件供应"
                      }
                    ]
                  }
                ]
              },
              {
                id: "medequip-29-60",
                name: "应用场景与终端需求",
                children: [
                  {
                    id: "medequip-29-61",
                    name: "医疗机构与实验室",
                    children: [
                      {
                        id: "medequip-29-62",
                        name: "医院检验科"
                      },
                      {
                        id: "medequip-29-63",
                        name: "中心实验室"
                      },
                      {
                        id: "medequip-29-64",
                        name: "第三方医学实验室"
                      }
                    ]
                  },
                  {
                    id: "medequip-29-65",
                    name: "重点疾病场景",
                    children: [
                      {
                        id: "medequip-29-66",
                        name: "感染性疾病检测"
                      },
                      {
                        id: "medequip-29-67",
                        name: "肿瘤伴随诊断与液体活检"
                      },
                      {
                        id: "medequip-29-68",
                        name: "生殖遗传与罕见病检测"
                      },
                      {
                        id: "medequip-29-69",
                        name: "血筛与移植配型相关检测"
                      }
                    ]
                  },
                  {
                    id: "medequip-29-70",
                    name: "公共卫生与近患者场景",
                    children: [
                      {
                        id: "medequip-29-71",
                        name: "疾控与应急检测网络"
                      },
                      {
                        id: "medequip-29-72",
                        name: "基层与急诊近患者检测"
                      },
                      {
                        id: "medequip-29-73",
                        name: "海关口岸与移动实验室"
                      }
                    ]
                  },
                  {
                    id: "medequip-29-74",
                    name: "延展应用场景",
                    children: [
                      {
                        id: "medequip-29-75",
                        name: "药企伴随诊断合作"
                      },
                      {
                        id: "medequip-29-76",
                        name: "科研与转化医学平台"
                      },
                      {
                        id: "medequip-29-77",
                        name: "国际援助与资源受限地区部署"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "medequip-30",
            name: "医疗诊断监护及治疗设备",
            children: [
              {
                id: "medequip-30-1",
                name: "基础底座",
                children: [
                  {
                    id: "medequip-30-2",
                    name: "关键部件与材料",
                    children: [
                      {
                        id: "medequip-30-3",
                        name: "医学影像核心部件"
                      },
                      {
                        id: "medequip-30-4",
                        name: "生物检测核心原料与传感器"
                      },
                      {
                        id: "medequip-30-5",
                        name: "执行驱动与运动控制部件"
                      },
                      {
                        id: "medequip-30-6",
                        name: "医用高分子金属与植介入材料"
                      },
                      {
                        id: "medequip-30-7",
                        name: "一次性无菌耗材与关键试剂"
                      }
                    ]
                  },
                  {
                    id: "medequip-30-8",
                    name: "软件与数据底座",
                    children: [
                      {
                        id: "medequip-30-9",
                        name: "嵌入式软件与设备操作系统"
                      },
                      {
                        id: "medequip-30-10",
                        name: "医疗算法与智能判读模块"
                      },
                      {
                        id: "medequip-30-11",
                        name: "数据互联与远程管理平台"
                      },
                      {
                        id: "medequip-30-12",
                        name: "网络安全与隐私保护模块"
                      }
                    ]
                  },
                  {
                    id: "medequip-30-13",
                    name: "制造与验证底座",
                    children: [
                      {
                        id: "medequip-30-14",
                        name: "精密制造与洁净装配"
                      },
                      {
                        id: "medequip-30-15",
                        name: "灭菌包装与可靠性工程"
                      },
                      {
                        id: "medequip-30-16",
                        name: "校准测试与计量验证"
                      },
                      {
                        id: "medequip-30-17",
                        name: "质量体系与注册合规"
                      }
                    ]
                  }
                ]
              },
              {
                id: "medequip-30-18",
                name: "诊断设备",
                children: [
                  {
                    id: "medequip-30-19",
                    name: "影像诊断设备",
                    children: [
                      {
                        id: "medequip-30-20",
                        name: "数字 X 线与乳腺影像"
                      },
                      {
                        id: "medequip-30-21",
                        name: "计算机断层扫描设备"
                      },
                      {
                        id: "medequip-30-22",
                        name: "磁共振成像设备"
                      },
                      {
                        id: "medequip-30-23",
                        name: "超声诊断设备"
                      },
                      {
                        id: "medequip-30-24",
                        name: "核医学与分子影像设备"
                      },
                      {
                        id: "medequip-30-25",
                        name: "内窥与光学可视化设备"
                      }
                    ]
                  },
                  {
                    id: "medequip-30-26",
                    name: "体外诊断设备与系统",
                    children: [
                      {
                        id: "medequip-30-27",
                        name: "生化与免疫分析系统"
                      },
                      {
                        id: "medequip-30-28",
                        name: "血液与凝血分析系统"
                      },
                      {
                        id: "medequip-30-29",
                        name: "分子诊断与核酸检测系统"
                      },
                      {
                        id: "medequip-30-30",
                        name: "微生物与病理分析系统"
                      },
                      {
                        id: "medequip-30-31",
                        name: "床旁检测与家庭检测设备"
                      }
                    ]
                  },
                  {
                    id: "medequip-30-32",
                    name: "功能与生理诊断设备",
                    children: [
                      {
                        id: "medequip-30-33",
                        name: "心电与动态心电设备"
                      },
                      {
                        id: "medequip-30-34",
                        name: "脑电与神经电生理设备"
                      },
                      {
                        id: "medequip-30-35",
                        name: "肺功能与呼吸评估设备"
                      },
                      {
                        id: "medequip-30-36",
                        name: "睡眠与代谢评估设备"
                      }
                    ]
                  },
                  {
                    id: "medequip-30-37",
                    name: "辅助诊断与智能分析",
                    children: [
                      {
                        id: "medequip-30-38",
                        name: "影像后处理与辅助诊断软件"
                      },
                      {
                        id: "medequip-30-39",
                        name: "检验信息与智能决策支持系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "medequip-30-40",
                name: "监护与生命支持",
                children: [
                  {
                    id: "medequip-30-41",
                    name: "病人监护设备",
                    children: [
                      {
                        id: "medequip-30-42",
                        name: "床旁多参数监护设备"
                      },
                      {
                        id: "medequip-30-43",
                        name: "中央监护系统"
                      },
                      {
                        id: "medequip-30-44",
                        name: "可穿戴与远程监护设备"
                      },
                      {
                        id: "medequip-30-45",
                        name: "胎儿与母婴监护设备"
                      }
                    ]
                  },
                  {
                    id: "medequip-30-46",
                    name: "生命支持设备",
                    children: [
                      {
                        id: "medequip-30-47",
                        name: "呼吸机与麻醉机"
                      },
                      {
                        id: "medequip-30-48",
                        name: "输注泵与营养泵"
                      },
                      {
                        id: "medequip-30-49",
                        name: "血液净化设备"
                      },
                      {
                        id: "medequip-30-50",
                        name: "体外循环与循环支持设备"
                      }
                    ]
                  },
                  {
                    id: "medequip-30-51",
                    name: "慢病管理与院外延伸设备",
                    children: [
                      {
                        id: "medequip-30-52",
                        name: "血糖与血压连续监测设备"
                      },
                      {
                        id: "medequip-30-53",
                        name: "心律与心衰远程管理设备"
                      },
                      {
                        id: "medequip-30-54",
                        name: "居家康复监测设备"
                      },
                      {
                        id: "medequip-30-55",
                        name: "数据采集与随访终端"
                      }
                    ]
                  }
                ]
              },
              {
                id: "medequip-30-56",
                name: "治疗设备",
                children: [
                  {
                    id: "medequip-30-57",
                    name: "微创与手术治疗设备",
                    children: [
                      {
                        id: "medequip-30-58",
                        name: "高频电外科与能量平台"
                      },
                      {
                        id: "medequip-30-59",
                        name: "腔镜与手术导航设备"
                      },
                      {
                        id: "medequip-30-60",
                        name: "手术机器人系统"
                      },
                      {
                        id: "medequip-30-61",
                        name: "导管介入与消融设备"
                      }
                    ]
                  },
                  {
                    id: "medequip-30-62",
                    name: "放射与物理治疗设备",
                    children: [
                      {
                        id: "medequip-30-63",
                        name: "放射治疗设备"
                      },
                      {
                        id: "medequip-30-64",
                        name: "激光治疗设备"
                      },
                      {
                        id: "medequip-30-65",
                        name: "超声与微波治疗设备"
                      },
                      {
                        id: "medequip-30-66",
                        name: "冷冻与热疗设备"
                      }
                    ]
                  },
                  {
                    id: "medequip-30-67",
                    name: "植入与替代治疗设备",
                    children: [
                      {
                        id: "medequip-30-68",
                        name: "心脏起搏除颤设备"
                      },
                      {
                        id: "medequip-30-69",
                        name: "骨科植入与关节替代设备"
                      },
                      {
                        id: "medequip-30-70",
                        name: "神经刺激与功能重建设备"
                      },
                      {
                        id: "medequip-30-71",
                        name: "眼科与耳鼻喉植入设备"
                      }
                    ]
                  },
                  {
                    id: "medequip-30-72",
                    name: "专科治疗设备",
                    children: [
                      {
                        id: "medequip-30-73",
                        name: "透析与肾脏替代治疗设备"
                      },
                      {
                        id: "medequip-30-74",
                        name: "妇儿与泌尿治疗设备"
                      },
                      {
                        id: "medequip-30-75",
                        name: "口腔治疗设备"
                      },
                      {
                        id: "medequip-30-76",
                        name: "康复治疗设备"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "medequip-31",
            name: "康复辅具",
            children: [
              {
                id: "medequip-31-1",
                name: "基础材料与关键部件",
                children: [
                  {
                    id: "medequip-31-2",
                    name: "结构材料与人体接口",
                    children: [
                      {
                        id: "medequip-31-3",
                        name: "医用高分子与发泡材料"
                      },
                      {
                        id: "medequip-31-4",
                        name: "金属合金与复合材料"
                      },
                      {
                        id: "medequip-31-5",
                        name: "医用纺织品与硅胶衬垫"
                      }
                    ]
                  },
                  {
                    id: "medequip-31-6",
                    name: "感知控制与电子模块",
                    children: [
                      {
                        id: "medequip-31-7",
                        name: "压力、力学、姿态与步态传感"
                      },
                      {
                        id: "medequip-31-8",
                        name: "肌电、视觉、语音与听觉传感"
                      },
                      {
                        id: "medequip-31-9",
                        name: "控制器、嵌入式软件与通信模组"
                      }
                    ]
                  },
                  {
                    id: "medequip-31-10",
                    name: "驱动与传动单元",
                    children: [
                      {
                        id: "medequip-31-11",
                        name: "电机、减速器与线性执行器"
                      },
                      {
                        id: "medequip-31-12",
                        name: "气动、液压与柔性驱动"
                      },
                      {
                        id: "medequip-31-13",
                        name: "电池、电源管理与充电系统"
                      }
                    ]
                  },
                  {
                    id: "medequip-31-14",
                    name: "连接与适配组件",
                    children: [
                      {
                        id: "medequip-31-15",
                        name: "关节、铰链、限位与锁止机构"
                      },
                      {
                        id: "medequip-31-16",
                        name: "绑带、快拆、支撑与定位组件"
                      },
                      {
                        id: "medequip-31-17",
                        name: "座椅、靠背、轮组与底盘件"
                      }
                    ]
                  }
                ]
              },
              {
                id: "medequip-31-18",
                name: "核心产品与系统",
                children: [
                  {
                    id: "medequip-31-19",
                    name: "功能代偿与穿戴支撑",
                    children: [
                      {
                        id: "medequip-31-20",
                        name: "假肢"
                      },
                      {
                        id: "medequip-31-21",
                        name: "矫形器与支具"
                      },
                      {
                        id: "medequip-31-22",
                        name: "外骨骼与助力穿戴设备"
                      }
                    ]
                  },
                  {
                    id: "medequip-31-23",
                    name: "移动转移与姿态支持",
                    children: [
                      {
                        id: "medequip-31-24",
                        name: "手动轮椅与电动轮椅"
                      },
                      {
                        id: "medequip-31-25",
                        name: "助行器、拐杖与代步车"
                      },
                      {
                        id: "medequip-31-26",
                        name: "站立架、移位机与转移辅助设备"
                      }
                    ]
                  },
                  {
                    id: "medequip-31-27",
                    name: "康复治疗与训练设备",
                    children: [
                      {
                        id: "medequip-31-28",
                        name: "物理治疗与理疗设备"
                      },
                      {
                        id: "medequip-31-29",
                        name: "上下肢运动训练设备"
                      },
                      {
                        id: "medequip-31-30",
                        name: "步态、平衡与作业治疗设备"
                      },
                      {
                        id: "medequip-31-31",
                        name: "言语、认知与吞咽康复设备"
                      }
                    ]
                  },
                  {
                    id: "medequip-31-32",
                    name: "生活自理与环境适配辅具",
                    children: [
                      {
                        id: "medequip-31-33",
                        name: "进食、洗浴、如厕与防护辅具"
                      },
                      {
                        id: "medequip-31-34",
                        name: "家居家具适配与无障碍辅具"
                      },
                      {
                        id: "medequip-31-35",
                        name: "操作物体与家务辅助器具"
                      }
                    ]
                  },
                  {
                    id: "medequip-31-36",
                    name: "感官与沟通辅具",
                    children: [
                      {
                        id: "medequip-31-37",
                        name: "助听与听觉辅具"
                      },
                      {
                        id: "medequip-31-38",
                        name: "低视力与视觉辅具"
                      },
                      {
                        id: "medequip-31-39",
                        name: "沟通、信息与认知辅助设备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "medequip-31-40",
                name: "适配制造与交付服务",
                children: [
                  {
                    id: "medequip-31-41",
                    name: "评估与适配",
                    children: [
                      {
                        id: "medequip-31-42",
                        name: "步态、足压、姿态与生物力学评估"
                      },
                      {
                        id: "medequip-31-43",
                        name: "听力、视力、言语与认知评估"
                      },
                      {
                        id: "medequip-31-44",
                        name: "座姿定位、假肢矫形取型与个体适配"
                      }
                    ]
                  },
                  {
                    id: "medequip-31-45",
                    name: "定制设计与制造",
                    children: [
                      {
                        id: "medequip-31-46",
                        name: "三维扫描、CAD/CAM与数字建模"
                      },
                      {
                        id: "medequip-31-47",
                        name: "3D打印、定制加工与装配调试"
                      },
                      {
                        id: "medequip-31-48",
                        name: "表面处理、消毒清洁与维修翻新"
                      }
                    ]
                  },
                  {
                    id: "medequip-31-49",
                    name: "检测认证与质量保障",
                    children: [
                      {
                        id: "medequip-31-50",
                        name: "电气安全与环境可靠性测试"
                      },
                      {
                        id: "medequip-31-51",
                        name: "生物相容性与耐久性验证"
                      },
                      {
                        id: "medequip-31-52",
                        name: "注册备案与标准符合性测试"
                      }
                    ]
                  },
                  {
                    id: "medequip-31-53",
                    name: "渠道与服务网络",
                    children: [
                      {
                        id: "medequip-31-54",
                        name: "医院与康复机构"
                      },
                      {
                        id: "medequip-31-55",
                        name: "养老机构与社区服务"
                      },
                      {
                        id: "medequip-31-56",
                        name: "经销代理、电商与租赁回收"
                      },
                      {
                        id: "medequip-31-57",
                        name: "售后维护与持续随访"
                      }
                    ]
                  }
                ]
              },
              {
                id: "medequip-31-58",
                name: "应用场景与产业环境",
                children: [
                  {
                    id: "medequip-31-59",
                    name: "重点服务人群",
                    children: [
                      {
                        id: "medequip-31-60",
                        name: "残障人群"
                      },
                      {
                        id: "medequip-31-61",
                        name: "老年人群"
                      },
                      {
                        id: "medequip-31-62",
                        name: "术后、创伤与慢病人群"
                      },
                      {
                        id: "medequip-31-63",
                        name: "儿童康复人群"
                      }
                    ]
                  },
                  {
                    id: "medequip-31-64",
                    name: "数字化与互联生态",
                    children: [
                      {
                        id: "medequip-31-65",
                        name: "远程康复与居家监测"
                      },
                      {
                        id: "medequip-31-66",
                        name: "设备管理与数据平台"
                      },
                      {
                        id: "medequip-31-67",
                        name: "AI辅助评估与训练反馈"
                      }
                    ]
                  },
                  {
                    id: "medequip-31-68",
                    name: "支付与采购体系",
                    children: [
                      {
                        id: "medequip-31-69",
                        name: "政府采购与公益配置"
                      },
                      {
                        id: "medequip-31-70",
                        name: "医保、长护险与商业支付"
                      },
                      {
                        id: "medequip-31-71",
                        name: "国际援助与批量采购"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    midstream: {
      label: "中游",
      root: {
        id: "medequip-midstream",
        name: "医疗保健用品",
        children: [
          {
            id: "medequip-32",
            name: "医疗植介入器械",
            children: [
              {
                id: "medequip-32-1",
                name: "基础材料与关键部件",
                children: [
                  {
                    id: "medequip-32-2",
                    name: "医用材料",
                    children: [
                      {
                        id: "medequip-32-3",
                        name: "金属材料"
                      },
                      {
                        id: "medequip-32-4",
                        name: "高分子与弹性体"
                      },
                      {
                        id: "medequip-32-5",
                        name: "陶瓷与复合材料"
                      },
                      {
                        id: "medequip-32-6",
                        name: "生物可降解与生物活性材料"
                      }
                    ]
                  },
                  {
                    id: "medequip-32-7",
                    name: "功能部件",
                    children: [
                      {
                        id: "medequip-32-8",
                        name: "导管轴管与内衬"
                      },
                      {
                        id: "medequip-32-9",
                        name: "球囊与扩张部件"
                      },
                      {
                        id: "medequip-32-10",
                        name: "支架与骨架结构件"
                      },
                      {
                        id: "medequip-32-11",
                        name: "导丝鞘管与推送系统"
                      },
                      {
                        id: "medequip-32-12",
                        name: "电极传感与电池封装"
                      }
                    ]
                  },
                  {
                    id: "medequip-32-13",
                    name: "表面与载药技术",
                    children: [
                      {
                        id: "medequip-32-14",
                        name: "药物涂层与载体"
                      },
                      {
                        id: "medequip-32-15",
                        name: "亲水抗凝抗菌涂层"
                      },
                      {
                        id: "medequip-32-16",
                        name: "表面改性与微纳结构"
                      }
                    ]
                  }
                ]
              },
              {
                id: "medequip-32-17",
                name: "研发制造与质量工程",
                children: [
                  {
                    id: "medequip-32-18",
                    name: "研发设计",
                    children: [
                      {
                        id: "medequip-32-19",
                        name: "解剖与力学建模"
                      },
                      {
                        id: "medequip-32-20",
                        name: "结构设计与仿真"
                      },
                      {
                        id: "medequip-32-21",
                        name: "递送系统设计"
                      },
                      {
                        id: "medequip-32-22",
                        name: "软件算法与导航集成"
                      }
                    ]
                  },
                  {
                    id: "medequip-32-23",
                    name: "制造工艺",
                    children: [
                      {
                        id: "medequip-32-24",
                        name: "精密挤出与多层共挤"
                      },
                      {
                        id: "medequip-32-25",
                        name: "编织绕簧与热定型"
                      },
                      {
                        id: "medequip-32-26",
                        name: "激光切割与微细加工"
                      },
                      {
                        id: "medequip-32-27",
                        name: "焊接粘接与系统装配"
                      }
                    ]
                  },
                  {
                    id: "medequip-32-28",
                    name: "质量与验证",
                    children: [
                      {
                        id: "medequip-32-29",
                        name: "材料理化与生物相容性评价"
                      },
                      {
                        id: "medequip-32-30",
                        name: "力学疲劳与输送释放测试"
                      },
                      {
                        id: "medequip-32-31",
                        name: "灭菌无菌包装与货架期验证"
                      },
                      {
                        id: "medequip-32-32",
                        name: "动物实验与临床评价"
                      }
                    ]
                  }
                ]
              },
              {
                id: "medequip-32-33",
                name: "核心植介入产品",
                children: [
                  {
                    id: "medequip-32-34",
                    name: "血管介入",
                    children: [
                      {
                        id: "medequip-32-35",
                        name: "冠脉支架与药物球囊"
                      },
                      {
                        id: "medequip-32-36",
                        name: "外周血管支架球囊与覆膜支架"
                      },
                      {
                        id: "medequip-32-37",
                        name: "导管导丝鞘管与取栓抽吸器械"
                      },
                      {
                        id: "medequip-32-38",
                        name: "栓塞材料与栓塞系统"
                      }
                    ]
                  },
                  {
                    id: "medequip-32-39",
                    name: "结构性心脏与心律管理",
                    children: [
                      {
                        id: "medequip-32-40",
                        name: "经导管瓣膜系统"
                      },
                      {
                        id: "medequip-32-41",
                        name: "封堵器与缺损修复系统"
                      },
                      {
                        id: "medequip-32-42",
                        name: "起搏除颤与再同步系统"
                      },
                      {
                        id: "medequip-32-43",
                        name: "电生理消融与标测系统"
                      }
                    ]
                  },
                  {
                    id: "medequip-32-44",
                    name: "神经与其他植入",
                    children: [
                      {
                        id: "medequip-32-45",
                        name: "神经介入支架弹簧圈与取栓系统"
                      },
                      {
                        id: "medequip-32-46",
                        name: "脊柱与骨科植入系统"
                      },
                      {
                        id: "medequip-32-47",
                        name: "口腔种植与修复系统"
                      },
                      {
                        id: "medequip-32-48",
                        name: "神经刺激与其他有源植入系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "medequip-32-49",
                name: "临床应用与产业支撑",
                children: [
                  {
                    id: "medequip-32-50",
                    name: "应用场景",
                    children: [
                      {
                        id: "medequip-32-51",
                        name: "冠心病与急性心肌梗死"
                      },
                      {
                        id: "medequip-32-52",
                        name: "结构性心脏病与心律失常"
                      },
                      {
                        id: "medequip-32-53",
                        name: "脑卒中与颅内动脉瘤"
                      },
                      {
                        id: "medequip-32-54",
                        name: "骨科修复与口腔修复"
                      }
                    ]
                  },
                  {
                    id: "medequip-32-55",
                    name: "诊疗配套",
                    children: [
                      {
                        id: "medequip-32-56",
                        name: "介入影像与导航配套"
                      },
                      {
                        id: "medequip-32-57",
                        name: "术式培训与临床支持"
                      },
                      {
                        id: "medequip-32-58",
                        name: "随访管理与真实世界数据"
                      },
                      {
                        id: "medequip-32-59",
                        name: "供应链与渠道配送"
                      }
                    ]
                  },
                  {
                    id: "medequip-32-60",
                    name: "合规与市场准入",
                    children: [
                      {
                        id: "medequip-32-61",
                        name: "注册申报与临床证据"
                      },
                      {
                        id: "medequip-32-62",
                        name: "质量体系与追溯"
                      },
                      {
                        id: "medequip-32-63",
                        name: "医保支付与集中采购"
                      },
                      {
                        id: "medequip-32-64",
                        name: "国际认证与出海合规"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  pharmabio: {
    upstream: {
      label: "上游",
      root: {
        id: "pharmabio-upstream",
        name: "生物技术",
        children: [
          {
            id: "pharmabio-33",
            name: "创新生物药",
            children: [
              {
                id: "pharmabio-33-1",
                name: "创新来源与药物发现",
                children: [
                  {
                    id: "pharmabio-33-2",
                    name: "靶点与机制研究",
                    children: [
                      {
                        id: "pharmabio-33-3",
                        name: "疾病机制解析"
                      },
                      {
                        id: "pharmabio-33-4",
                        name: "靶点发现与验证"
                      },
                      {
                        id: "pharmabio-33-5",
                        name: "生物标志物与分层策略"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-33-6",
                    name: "候选分子与技术平台",
                    children: [
                      {
                        id: "pharmabio-33-7",
                        name: "单抗与双抗多抗"
                      },
                      {
                        id: "pharmabio-33-8",
                        name: "抗体偶联药物"
                      },
                      {
                        id: "pharmabio-33-9",
                        name: "重组蛋白与融合蛋白"
                      },
                      {
                        id: "pharmabio-33-10",
                        name: "核酸药物"
                      },
                      {
                        id: "pharmabio-33-11",
                        name: "细胞治疗与基因治疗"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-33-12",
                    name: "发现支撑体系",
                    children: [
                      {
                        id: "pharmabio-33-13",
                        name: "AI与计算设计"
                      },
                      {
                        id: "pharmabio-33-14",
                        name: "高通量筛选与功能评估"
                      },
                      {
                        id: "pharmabio-33-15",
                        name: "知识产权与技术转移"
                      }
                    ]
                  }
                ]
              },
              {
                id: "pharmabio-33-16",
                name: "开发转化与注册申报",
                children: [
                  {
                    id: "pharmabio-33-17",
                    name: "药学研究与CMC开发",
                    children: [
                      {
                        id: "pharmabio-33-18",
                        name: "细胞株菌株与载体构建"
                      },
                      {
                        id: "pharmabio-33-19",
                        name: "工艺开发与放大"
                      },
                      {
                        id: "pharmabio-33-20",
                        name: "制剂处方与稳定性研究"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-33-21",
                    name: "非临床评价",
                    children: [
                      {
                        id: "pharmabio-33-22",
                        name: "药效与作用机制验证"
                      },
                      {
                        id: "pharmabio-33-23",
                        name: "药代毒理与免疫原性评价"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-33-24",
                    name: "临床开发与注册申报",
                    children: [
                      {
                        id: "pharmabio-33-25",
                        name: "IND申报与早期临床"
                      },
                      {
                        id: "pharmabio-33-26",
                        name: "关键注册临床与上市申请"
                      },
                      {
                        id: "pharmabio-33-27",
                        name: "上市后变更与再评价"
                      }
                    ]
                  }
                ]
              },
              {
                id: "pharmabio-33-28",
                name: "生产制造与供应保障",
                children: [
                  {
                    id: "pharmabio-33-29",
                    name: "关键原料与核心耗材",
                    children: [
                      {
                        id: "pharmabio-33-30",
                        name: "细胞库质粒与病毒载体"
                      },
                      {
                        id: "pharmabio-33-31",
                        name: "培养基试剂与功能辅料"
                      },
                      {
                        id: "pharmabio-33-32",
                        name: "树脂膜包材与一次性系统"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-33-33",
                    name: "核心制造环节",
                    children: [
                      {
                        id: "pharmabio-33-34",
                        name: "上游表达与细胞培养"
                      },
                      {
                        id: "pharmabio-33-35",
                        name: "下游分离纯化与病毒清除"
                      },
                      {
                        id: "pharmabio-33-36",
                        name: "偶联修饰封装与无菌灌装"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-33-37",
                    name: "质量体系与流通交付",
                    children: [
                      {
                        id: "pharmabio-33-38",
                        name: "分析检测与批次放行"
                      },
                      {
                        id: "pharmabio-33-39",
                        name: "GMP验证与持续工艺确认"
                      },
                      {
                        id: "pharmabio-33-40",
                        name: "冷链仓储与运输配送"
                      }
                    ]
                  }
                ]
              },
              {
                id: "pharmabio-33-41",
                name: "商业化与临床应用",
                children: [
                  {
                    id: "pharmabio-33-42",
                    name: "市场准入与支付",
                    children: [
                      {
                        id: "pharmabio-33-43",
                        name: "定价医保与商业保险"
                      },
                      {
                        id: "pharmabio-33-44",
                        name: "招标采购与院内准入"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-33-45",
                    name: "医疗应用与患者管理",
                    children: [
                      {
                        id: "pharmabio-33-46",
                        name: "临床路径与专科用药"
                      },
                      {
                        id: "pharmabio-33-47",
                        name: "伴随诊断与患者随访"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-33-48",
                    name: "上市后运营与全球合作",
                    children: [
                      {
                        id: "pharmabio-33-49",
                        name: "药物警戒与真实世界研究"
                      },
                      {
                        id: "pharmabio-33-50",
                        name: "国际授权与商务拓展"
                      },
                      {
                        id: "pharmabio-33-51",
                        name: "学术品牌与渠道运营"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "pharmabio-34",
            name: "基因工程药物和疫苗",
            children: [
              {
                id: "pharmabio-34-1",
                name: "基础资源与技术平台",
                children: [
                  {
                    id: "pharmabio-34-2",
                    name: "生物材料与底层资源",
                    children: [
                      {
                        id: "pharmabio-34-3",
                        name: "靶点与抗原资源"
                      },
                      {
                        id: "pharmabio-34-4",
                        name: "基因序列与载体元件"
                      },
                      {
                        id: "pharmabio-34-5",
                        name: "细胞株、工程菌、菌毒种与种子库"
                      },
                      {
                        id: "pharmabio-34-6",
                        name: "质粒、酶、核苷酸与寡核苷酸"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-34-7",
                    name: "工艺原辅料与关键耗材",
                    children: [
                      {
                        id: "pharmabio-34-8",
                        name: "培养基、缓冲液与一次性生物工艺耗材"
                      },
                      {
                        id: "pharmabio-34-9",
                        name: "纯化填料、过滤膜与层析介质"
                      },
                      {
                        id: "pharmabio-34-10",
                        name: "佐剂、脂质纳米颗粒与制剂辅料"
                      },
                      {
                        id: "pharmabio-34-11",
                        name: "包材、给药装置与冷链包装"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-34-12",
                    name: "设备与数字化底座",
                    children: [
                      {
                        id: "pharmabio-34-13",
                        name: "生物反应器、发酵系统与配液系统"
                      },
                      {
                        id: "pharmabio-34-14",
                        name: "层析、过滤、灌装与冻干设备"
                      },
                      {
                        id: "pharmabio-34-15",
                        name: "分析仪器与在线监测系统"
                      },
                      {
                        id: "pharmabio-34-16",
                        name: "质量数据、MES 与供应链协同系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "pharmabio-34-17",
                name: "研发与转化",
                children: [
                  {
                    id: "pharmabio-34-18",
                    name: "基因工程药物研发",
                    children: [
                      {
                        id: "pharmabio-34-19",
                        name: "重组蛋白与多肽药物设计"
                      },
                      {
                        id: "pharmabio-34-20",
                        name: "单抗、双抗与融合蛋白设计"
                      },
                      {
                        id: "pharmabio-34-21",
                        name: "核酸药物与递送体系设计"
                      },
                      {
                        id: "pharmabio-34-22",
                        name: "基因治疗载体与编辑系统设计"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-34-23",
                    name: "疫苗研发",
                    children: [
                      {
                        id: "pharmabio-34-24",
                        name: "重组蛋白疫苗设计"
                      },
                      {
                        id: "pharmabio-34-25",
                        name: "核酸疫苗设计"
                      },
                      {
                        id: "pharmabio-34-26",
                        name: "病毒载体疫苗设计"
                      },
                      {
                        id: "pharmabio-34-27",
                        name: "灭活、减毒与类病毒颗粒疫苗设计"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-34-28",
                    name: "开发验证",
                    children: [
                      {
                        id: "pharmabio-34-29",
                        name: "细胞株与工程菌构建"
                      },
                      {
                        id: "pharmabio-34-30",
                        name: "工艺开发与放大研究"
                      },
                      {
                        id: "pharmabio-34-31",
                        name: "分析方法开发与质量研究"
                      },
                      {
                        id: "pharmabio-34-32",
                        name: "非临床评价与临床开发"
                      }
                    ]
                  }
                ]
              },
              {
                id: "pharmabio-34-33",
                name: "生产制造与质量体系",
                children: [
                  {
                    id: "pharmabio-34-34",
                    name: "原液生产",
                    children: [
                      {
                        id: "pharmabio-34-35",
                        name: "细胞培养与发酵表达"
                      },
                      {
                        id: "pharmabio-34-36",
                        name: "病毒扩增与抗原制备"
                      },
                      {
                        id: "pharmabio-34-37",
                        name: "收获、裂解与澄清"
                      },
                      {
                        id: "pharmabio-34-38",
                        name: "纯化、浓缩与超滤置换"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-34-39",
                    name: "制剂与成品生产",
                    children: [
                      {
                        id: "pharmabio-34-40",
                        name: "配方开发与稳定性研究"
                      },
                      {
                        id: "pharmabio-34-41",
                        name: "佐剂、LNP 与递送体系制备"
                      },
                      {
                        id: "pharmabio-34-42",
                        name: "无菌灌装、冻干与包装"
                      },
                      {
                        id: "pharmabio-34-43",
                        name: "冷链储运适配"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-34-44",
                    name: "质量与合规",
                    children: [
                      {
                        id: "pharmabio-34-45",
                        name: "细胞库、种子批与原材料控制"
                      },
                      {
                        id: "pharmabio-34-46",
                        name: "理化、活性与效力检测"
                      },
                      {
                        id: "pharmabio-34-47",
                        name: "无菌、微生物与病毒安全检测"
                      },
                      {
                        id: "pharmabio-34-48",
                        name: "放行、持续工艺验证与药物警戒"
                      }
                    ]
                  }
                ]
              },
              {
                id: "pharmabio-34-49",
                name: "商业化与应用生态",
                children: [
                  {
                    id: "pharmabio-34-50",
                    name: "产业化协同",
                    children: [
                      {
                        id: "pharmabio-34-51",
                        name: "CRO、CDMO 与 CMO 服务"
                      },
                      {
                        id: "pharmabio-34-52",
                        name: "注册申报与市场准入"
                      },
                      {
                        id: "pharmabio-34-53",
                        name: "商业化生产基地与供应保障"
                      },
                      {
                        id: "pharmabio-34-54",
                        name: "国际化合作与技术转移"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-34-55",
                    name: "医疗与免疫应用",
                    children: [
                      {
                        id: "pharmabio-34-56",
                        name: "医院与治疗中心准入"
                      },
                      {
                        id: "pharmabio-34-57",
                        name: "疫苗接种体系与公共卫生项目"
                      },
                      {
                        id: "pharmabio-34-58",
                        name: "患者管理与真实世界研究"
                      },
                      {
                        id: "pharmabio-34-59",
                        name: "采购、配送与终端可及性"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    midstream: {
      label: "中游",
      root: {
        id: "pharmabio-midstream",
        name: "制药",
        children: [
          {
            id: "pharmabio-35",
            name: "高端化学药制剂",
            children: [
              {
                id: "pharmabio-35-1",
                name: "关键物料与装备",
                children: [
                  {
                    id: "pharmabio-35-2",
                    name: "原料药与功能性物料",
                    children: [
                      {
                        id: "pharmabio-35-3",
                        name: "高活高难度原料药"
                      },
                      {
                        id: "pharmabio-35-4",
                        name: "增溶稳态辅料"
                      },
                      {
                        id: "pharmabio-35-5",
                        name: "缓控释骨架与包衣材料"
                      },
                      {
                        id: "pharmabio-35-6",
                        name: "无菌配液与专用溶媒"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-35-7",
                    name: "给药与包装部件",
                    children: [
                      {
                        id: "pharmabio-35-8",
                        name: "西林瓶与安瓿"
                      },
                      {
                        id: "pharmabio-35-9",
                        name: "预灌封注射器与卡式瓶"
                      },
                      {
                        id: "pharmabio-35-10",
                        name: "胶塞铝盖与阻隔膜材"
                      },
                      {
                        id: "pharmabio-35-11",
                        name: "吸入与喷雾装置部件"
                      },
                      {
                        id: "pharmabio-35-12",
                        name: "透皮贴剂基材与释药膜"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-35-13",
                    name: "工艺装备与工程系统",
                    children: [
                      {
                        id: "pharmabio-35-14",
                        name: "配液乳化均质设备"
                      },
                      {
                        id: "pharmabio-35-15",
                        name: "制粒包衣微丸设备"
                      },
                      {
                        id: "pharmabio-35-16",
                        name: "无菌灌装隔离器与冻干系统"
                      },
                      {
                        id: "pharmabio-35-17",
                        name: "在线检测视觉检测与自动化系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "pharmabio-35-18",
                name: "制剂技术与产品体系",
                children: [
                  {
                    id: "pharmabio-35-19",
                    name: "口服改良型制剂",
                    children: [
                      {
                        id: "pharmabio-35-20",
                        name: "高端片剂与胶囊"
                      },
                      {
                        id: "pharmabio-35-21",
                        name: "缓控释制剂"
                      },
                      {
                        id: "pharmabio-35-22",
                        name: "口崩与多颗粒系统"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-35-23",
                    name: "注射与无菌制剂",
                    children: [
                      {
                        id: "pharmabio-35-24",
                        name: "注射液与粉针"
                      },
                      {
                        id: "pharmabio-35-25",
                        name: "预灌封与卡式瓶制剂"
                      },
                      {
                        id: "pharmabio-35-26",
                        name: "冻干制剂"
                      },
                      {
                        id: "pharmabio-35-27",
                        name: "长效缓释注射剂"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-35-28",
                    name: "特殊给药系统",
                    children: [
                      {
                        id: "pharmabio-35-29",
                        name: "脂质体与纳米制剂"
                      },
                      {
                        id: "pharmabio-35-30",
                        name: "吸入制剂"
                      },
                      {
                        id: "pharmabio-35-31",
                        name: "眼用制剂"
                      },
                      {
                        id: "pharmabio-35-32",
                        name: "透皮与黏膜制剂"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-35-33",
                    name: "复合高壁垒制剂",
                    children: [
                      {
                        id: "pharmabio-35-34",
                        name: "药械组合制剂"
                      },
                      {
                        id: "pharmabio-35-35",
                        name: "复杂仿制药"
                      },
                      {
                        id: "pharmabio-35-36",
                        name: "改良型新药制剂"
                      },
                      {
                        id: "pharmabio-35-37",
                        name: "高活窄治疗窗制剂"
                      }
                    ]
                  }
                ]
              },
              {
                id: "pharmabio-35-38",
                name: "产业化制造与质量体系",
                children: [
                  {
                    id: "pharmabio-35-39",
                    name: "处方与工艺开发",
                    children: [
                      {
                        id: "pharmabio-35-40",
                        name: "预配方与处方筛选"
                      },
                      {
                        id: "pharmabio-35-41",
                        name: "质量源于设计"
                      },
                      {
                        id: "pharmabio-35-42",
                        name: "工艺放大与技术转移"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-35-43",
                    name: "商业化生产",
                    children: [
                      {
                        id: "pharmabio-35-44",
                        name: "固体制剂制造"
                      },
                      {
                        id: "pharmabio-35-45",
                        name: "无菌配制与灌封"
                      },
                      {
                        id: "pharmabio-35-46",
                        name: "冻干与后处理"
                      },
                      {
                        id: "pharmabio-35-47",
                        name: "包装组装与贴签"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-35-48",
                    name: "分析检测与质量控制",
                    children: [
                      {
                        id: "pharmabio-35-49",
                        name: "理化分析与杂质控制"
                      },
                      {
                        id: "pharmabio-35-50",
                        name: "粒径释放与体外评价"
                      },
                      {
                        id: "pharmabio-35-51",
                        name: "无菌微生物与可见异物控制"
                      },
                      {
                        id: "pharmabio-35-52",
                        name: "稳定性与密封完整性研究"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-35-53",
                    name: "合规与供应保障",
                    children: [
                      {
                        id: "pharmabio-35-54",
                        name: "注册申报与一致性评价"
                      },
                      {
                        id: "pharmabio-35-55",
                        name: "GMP 与无菌体系实施"
                      },
                      {
                        id: "pharmabio-35-56",
                        name: "委托生产与产能协同"
                      },
                      {
                        id: "pharmabio-35-57",
                        name: "持续供货与质量追溯"
                      }
                    ]
                  }
                ]
              },
              {
                id: "pharmabio-35-58",
                name: "终端应用与产业支撑",
                children: [
                  {
                    id: "pharmabio-35-59",
                    name: "重点治疗领域",
                    children: [
                      {
                        id: "pharmabio-35-60",
                        name: "肿瘤用药"
                      },
                      {
                        id: "pharmabio-35-61",
                        name: "麻醉镇痛用药"
                      },
                      {
                        id: "pharmabio-35-62",
                        name: "抗感染用药"
                      },
                      {
                        id: "pharmabio-35-63",
                        name: "呼吸眼科与慢病用药"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-35-64",
                    name: "医疗终端",
                    children: [
                      {
                        id: "pharmabio-35-65",
                        name: "院内注射与围手术期用药"
                      },
                      {
                        id: "pharmabio-35-66",
                        name: "院外慢病与居家给药"
                      },
                      {
                        id: "pharmabio-35-67",
                        name: "专科吸入与眼用治疗场景"
                      }
                    ]
                  },
                  {
                    id: "pharmabio-35-68",
                    name: "专业服务",
                    children: [
                      {
                        id: "pharmabio-35-69",
                        name: "分析开发与临床研究"
                      },
                      {
                        id: "pharmabio-35-70",
                        name: "注册法规与质量咨询"
                      },
                      {
                        id: "pharmabio-35-71",
                        name: "仓配冷链与追溯服务"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  techhw: {
    upstream: {
      label: "上游",
      root: {
        id: "techhw-upstream",
        name: "通信设备",
        children: [
          {
            id: "techhw-36",
            name: "信息安全设备",
            children: [
              {
                id: "techhw-36-1",
                name: "关键底座与核心部件",
                children: [
                  {
                    id: "techhw-36-2",
                    name: "专用计算与网络硬件",
                    children: [
                      {
                        id: "techhw-36-3",
                        name: "安全 SoC 与网络处理器"
                      },
                      {
                        id: "techhw-36-4",
                        name: "FPGA 与加速板卡"
                      },
                      {
                        id: "techhw-36-5",
                        name: "交换与路由芯片"
                      },
                      {
                        id: "techhw-36-6",
                        name: "存储、板卡、机箱、电源与散热"
                      }
                    ]
                  },
                  {
                    id: "techhw-36-7",
                    name: "密码与可信硬件",
                    children: [
                      {
                        id: "techhw-36-8",
                        name: "密码芯片与安全元件"
                      },
                      {
                        id: "techhw-36-9",
                        name: "TPM 与可信根模块"
                      },
                      {
                        id: "techhw-36-10",
                        name: "HSM 板卡与密码卡"
                      }
                    ]
                  },
                  {
                    id: "techhw-36-11",
                    name: "嵌入式软件与安全基础能力",
                    children: [
                      {
                        id: "techhw-36-12",
                        name: "嵌入式操作系统与虚拟化底座"
                      },
                      {
                        id: "techhw-36-13",
                        name: "数据库、中间件与日志存储底座"
                      },
                      {
                        id: "techhw-36-14",
                        name: "协议解析、规则库、特征库与威胁情报"
                      },
                      {
                        id: "techhw-36-15",
                        name: "DPI、沙箱与检测引擎"
                      }
                    ]
                  },
                  {
                    id: "techhw-36-16",
                    name: "开发与测试支撑",
                    children: [
                      {
                        id: "techhw-36-17",
                        name: "固件、安全启动与远程度量"
                      },
                      {
                        id: "techhw-36-18",
                        name: "漏洞研究、模糊测试与性能测试工具"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-36-19",
                name: "设备产品与系统组合",
                children: [
                  {
                    id: "techhw-36-20",
                    name: "网络与边界安全设备",
                    children: [
                      {
                        id: "techhw-36-21",
                        name: "下一代防火墙"
                      },
                      {
                        id: "techhw-36-22",
                        name: "入侵检测与入侵防御设备"
                      },
                      {
                        id: "techhw-36-23",
                        name: "VPN 与安全接入网关"
                      },
                      {
                        id: "techhw-36-24",
                        name: "抗 DDoS 与流量清洗设备"
                      },
                      {
                        id: "techhw-36-25",
                        name: "安全隔离与单向传输设备"
                      }
                    ]
                  },
                  {
                    id: "techhw-36-26",
                    name: "应用与访问控制设备",
                    children: [
                      {
                        id: "techhw-36-27",
                        name: "WAF 与 API 安全网关"
                      },
                      {
                        id: "techhw-36-28",
                        name: "堡垒机与运维审计设备"
                      },
                      {
                        id: "techhw-36-29",
                        name: "NAC 与零信任接入网关"
                      },
                      {
                        id: "techhw-36-30",
                        name: "安全 Web 与安全邮件网关"
                      }
                    ]
                  },
                  {
                    id: "techhw-36-31",
                    name: "数据与密码安全设备",
                    children: [
                      {
                        id: "techhw-36-32",
                        name: "HSM 与密钥管理设备"
                      },
                      {
                        id: "techhw-36-33",
                        name: "密码服务网关与签名验证设备"
                      },
                      {
                        id: "techhw-36-34",
                        name: "数据库审计与脱敏一体机"
                      },
                      {
                        id: "techhw-36-35",
                        name: "备份恢复与勒索防护设备"
                      }
                    ]
                  },
                  {
                    id: "techhw-36-36",
                    name: "检测分析与运营设备",
                    children: [
                      {
                        id: "techhw-36-37",
                        name: "日志审计与 SIEM 一体机"
                      },
                      {
                        id: "techhw-36-38",
                        name: "NDR 与流量分析设备"
                      },
                      {
                        id: "techhw-36-39",
                        name: "威胁情报与蜜罐诱捕设备"
                      },
                      {
                        id: "techhw-36-40",
                        name: "漏洞扫描与基线核查设备"
                      }
                    ]
                  },
                  {
                    id: "techhw-36-41",
                    name: "行业场景安全设备",
                    children: [
                      {
                        id: "techhw-36-42",
                        name: "工业防火墙与工控安全审计设备"
                      },
                      {
                        id: "techhw-36-43",
                        name: "物联网安全网关"
                      },
                      {
                        id: "techhw-36-44",
                        name: "车联网与边缘节点安全设备"
                      },
                      {
                        id: "techhw-36-45",
                        name: "数据中心与云边安全一体机"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-36-46",
                name: "制造交付与运行保障",
                children: [
                  {
                    id: "techhw-36-47",
                    name: "整机设计与供应组织",
                    children: [
                      {
                        id: "techhw-36-48",
                        name: "板卡设计与 BOM 管理"
                      },
                      {
                        id: "techhw-36-49",
                        name: "国产化适配与供应链安全"
                      },
                      {
                        id: "techhw-36-50",
                        name: "整机装配与可靠性设计"
                      }
                    ]
                  },
                  {
                    id: "techhw-36-51",
                    name: "测试认证与合规评估",
                    children: [
                      {
                        id: "techhw-36-52",
                        name: "密码检测认证"
                      },
                      {
                        id: "techhw-36-53",
                        name: "等级保护与关基相关测试"
                      },
                      {
                        id: "techhw-36-54",
                        name: "FIPS、EMC 与环境可靠性测试"
                      }
                    ]
                  },
                  {
                    id: "techhw-36-55",
                    name: "部署集成与策略编排",
                    children: [
                      {
                        id: "techhw-36-56",
                        name: "统一管理平台与策略编排"
                      },
                      {
                        id: "techhw-36-57",
                        name: "高可用、集群与旁路部署"
                      },
                      {
                        id: "techhw-36-58",
                        name: "与 IAM、云平台、SOC 对接"
                      }
                    ]
                  },
                  {
                    id: "techhw-36-59",
                    name: "生命周期管理",
                    children: [
                      {
                        id: "techhw-36-60",
                        name: "规则升级与情报更新"
                      },
                      {
                        id: "techhw-36-61",
                        name: "漏洞修复与固件升级"
                      },
                      {
                        id: "techhw-36-62",
                        name: "监测预警与应急响应"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-36-63",
                name: "行业应用与生态配套",
                children: [
                  {
                    id: "techhw-36-64",
                    name: "重点行业市场",
                    children: [
                      {
                        id: "techhw-36-65",
                        name: "党政与关键信息基础设施"
                      },
                      {
                        id: "techhw-36-66",
                        name: "金融"
                      },
                      {
                        id: "techhw-36-67",
                        name: "电信与互联网"
                      },
                      {
                        id: "techhw-36-68",
                        name: "能源与工业"
                      },
                      {
                        id: "techhw-36-69",
                        name: "医疗、教育与大型企业"
                      }
                    ]
                  },
                  {
                    id: "techhw-36-70",
                    name: "渠道与服务生态",
                    children: [
                      {
                        id: "techhw-36-71",
                        name: "集成商与渠道分销"
                      },
                      {
                        id: "techhw-36-72",
                        name: "驻场运维与托管安全运营"
                      },
                      {
                        id: "techhw-36-73",
                        name: "检测评估与攻防演练"
                      }
                    ]
                  },
                  {
                    id: "techhw-36-74",
                    name: "标准与监管环境",
                    children: [
                      {
                        id: "techhw-36-75",
                        name: "密码法规与等级保护"
                      },
                      {
                        id: "techhw-36-76",
                        name: "零信任与产品安全要求"
                      },
                      {
                        id: "techhw-36-77",
                        name: "行业标准与接口规范"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "techhw-37",
            name: "光通信核心器件",
            children: [
              {
                id: "techhw-37-1",
                name: "材料与基础平台",
                children: [
                  {
                    id: "techhw-37-2",
                    name: "半导体与功能材料",
                    children: [
                      {
                        id: "techhw-37-3",
                        name: "磷化铟外延与晶圆"
                      },
                      {
                        id: "techhw-37-4",
                        name: "砷化镓外延与晶圆"
                      },
                      {
                        id: "techhw-37-5",
                        name: "硅光晶圆与 SOI 平台"
                      },
                      {
                        id: "techhw-37-6",
                        name: "薄膜铌酸锂与电光材料"
                      },
                      {
                        id: "techhw-37-7",
                        name: "石英玻璃与高纯光学材料"
                      }
                    ]
                  },
                  {
                    id: "techhw-37-8",
                    name: "传输与无源基础件",
                    children: [
                      {
                        id: "techhw-37-9",
                        name: "通信光纤与特种光纤"
                      },
                      {
                        id: "techhw-37-10",
                        name: "光纤阵列与 FAU"
                      },
                      {
                        id: "techhw-37-11",
                        name: "连接器与 MT 插芯"
                      },
                      {
                        id: "techhw-37-12",
                        name: "耦合器与分路器"
                      },
                      {
                        id: "techhw-37-13",
                        name: "隔离器与环形器"
                      },
                      {
                        id: "techhw-37-14",
                        name: "滤波片与薄膜滤波器"
                      },
                      {
                        id: "techhw-37-15",
                        name: "PLC/AWG 波分器件"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-37-16",
                name: "核心光电器件",
                children: [
                  {
                    id: "techhw-37-17",
                    name: "光源与发射器件",
                    children: [
                      {
                        id: "techhw-37-18",
                        name: "DFB 激光器"
                      },
                      {
                        id: "techhw-37-19",
                        name: "DBR 与可调谐激光器"
                      },
                      {
                        id: "techhw-37-20",
                        name: "EML 电吸收调制激光器"
                      },
                      {
                        id: "techhw-37-21",
                        name: "VCSEL 与阵列光源"
                      },
                      {
                        id: "techhw-37-22",
                        name: "泵浦激光器"
                      }
                    ]
                  },
                  {
                    id: "techhw-37-23",
                    name: "调制与集成器件",
                    children: [
                      {
                        id: "techhw-37-24",
                        name: "硅光 PIC 发射芯片"
                      },
                      {
                        id: "techhw-37-25",
                        name: "马赫曾德尔调制器"
                      },
                      {
                        id: "techhw-37-26",
                        name: "IQ 调制器"
                      },
                      {
                        id: "techhw-37-27",
                        name: "外置激光源与集成发射前端"
                      }
                    ]
                  },
                  {
                    id: "techhw-37-28",
                    name: "接收与探测器件",
                    children: [
                      {
                        id: "techhw-37-29",
                        name: "PIN 光电探测器"
                      },
                      {
                        id: "techhw-37-30",
                        name: "APD 雪崩光电探测器"
                      },
                      {
                        id: "techhw-37-31",
                        name: "相干接收前端"
                      },
                      {
                        id: "techhw-37-32",
                        name: "高速接收光组件"
                      }
                    ]
                  },
                  {
                    id: "techhw-37-33",
                    name: "无源与可重构器件",
                    children: [
                      {
                        id: "techhw-37-34",
                        name: "衰减器与开关"
                      },
                      {
                        id: "techhw-37-35",
                        name: "WSS 波长选择开关"
                      },
                      {
                        id: "techhw-37-36",
                        name: "OADM 与 ROADM 关键光学器件"
                      },
                      {
                        id: "techhw-37-37",
                        name: "光放大关键器件"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-37-38",
                name: "制造与集成工程",
                children: [
                  {
                    id: "techhw-37-39",
                    name: "晶圆与芯片制造",
                    children: [
                      {
                        id: "techhw-37-40",
                        name: "外延生长"
                      },
                      {
                        id: "techhw-37-41",
                        name: "光刻刻蚀与薄膜沉积"
                      },
                      {
                        id: "techhw-37-42",
                        name: "芯片切割与耦合界面加工"
                      },
                      {
                        id: "techhw-37-43",
                        name: "晶圆级测试"
                      }
                    ]
                  },
                  {
                    id: "techhw-37-44",
                    name: "光器件封装与组装",
                    children: [
                      {
                        id: "techhw-37-45",
                        name: "TOSA 与 ROSA"
                      },
                      {
                        id: "techhw-37-46",
                        name: "BOSA 与 COB 封装"
                      },
                      {
                        id: "techhw-37-47",
                        name: "TROSA 与 IC-TROSA"
                      },
                      {
                        id: "techhw-37-48",
                        name: "有源对准与无源对准"
                      },
                      {
                        id: "techhw-37-49",
                        name: "CPO 光引擎与共封装互连"
                      }
                    ]
                  },
                  {
                    id: "techhw-37-50",
                    name: "配套电子与测试验证",
                    children: [
                      {
                        id: "techhw-37-51",
                        name: "Driver 与 TIA"
                      },
                      {
                        id: "techhw-37-52",
                        name: "DSP 与 Retimer"
                      },
                      {
                        id: "techhw-37-53",
                        name: "时钟恢复与电源管理"
                      },
                      {
                        id: "techhw-37-54",
                        name: "老化筛选与可靠性验证"
                      },
                      {
                        id: "techhw-37-55",
                        name: "一致性与互操作测试"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-37-56",
                name: "产品集成与应用牵引",
                children: [
                  {
                    id: "techhw-37-57",
                    name: "组件与子系统",
                    children: [
                      {
                        id: "techhw-37-58",
                        name: "可插拔相干光组件"
                      },
                      {
                        id: "techhw-37-59",
                        name: "波分复用与解复用子系统"
                      },
                      {
                        id: "techhw-37-60",
                        name: "光放大子系统"
                      },
                      {
                        id: "techhw-37-61",
                        name: "光交换与 ROADM 子系统"
                      }
                    ]
                  },
                  {
                    id: "techhw-37-62",
                    name: "模块与互连产品",
                    children: [
                      {
                        id: "techhw-37-63",
                        name: "100G 至 400G 直检光模块"
                      },
                      {
                        id: "techhw-37-64",
                        name: "400G 至 800G 相干可插拔模块"
                      },
                      {
                        id: "techhw-37-65",
                        name: "800G 至 1.6T 高速光模块"
                      },
                      {
                        id: "techhw-37-66",
                        name: "AOC 与 LPO/LRO 光互连"
                      }
                    ]
                  },
                  {
                    id: "techhw-37-67",
                    name: "典型应用",
                    children: [
                      {
                        id: "techhw-37-68",
                        name: "AI 数据中心与交换互连"
                      },
                      {
                        id: "techhw-37-69",
                        name: "数据中心互联与城域传送"
                      },
                      {
                        id: "techhw-37-70",
                        name: "长途与海缆传输"
                      },
                      {
                        id: "techhw-37-71",
                        name: "接入网与 FTTx"
                      },
                      {
                        id: "techhw-37-72",
                        name: "5G 前传中回传"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "techhw-38",
            name: "通信系统设备",
            children: [
              {
                id: "techhw-38-1",
                name: "关键器件与基础平台",
                children: [
                  {
                    id: "techhw-38-2",
                    name: "通信芯片与处理平台",
                    children: [
                      {
                        id: "techhw-38-3",
                        name: "基带与协议处理芯片"
                      },
                      {
                        id: "techhw-38-4",
                        name: "交换与网络处理芯片"
                      },
                      {
                        id: "techhw-38-5",
                        name: "光通信DSP与高速接口芯片"
                      },
                      {
                        id: "techhw-38-6",
                        name: "射频收发与电源管理芯片"
                      }
                    ]
                  },
                  {
                    id: "techhw-38-7",
                    name: "光电与射频器件",
                    children: [
                      {
                        id: "techhw-38-8",
                        name: "光模块与相干光器件"
                      },
                      {
                        id: "techhw-38-9",
                        name: "激光器与光探测器"
                      },
                      {
                        id: "techhw-38-10",
                        name: "功率放大器与低噪声放大器"
                      },
                      {
                        id: "techhw-38-11",
                        name: "滤波器与双工器"
                      }
                    ]
                  },
                  {
                    id: "techhw-38-12",
                    name: "结构件与基础配套",
                    children: [
                      {
                        id: "techhw-38-13",
                        name: "PCB与高速覆铜板"
                      },
                      {
                        id: "techhw-38-14",
                        name: "连接器与线缆组件"
                      },
                      {
                        id: "techhw-38-15",
                        name: "电源与散热系统"
                      },
                      {
                        id: "techhw-38-16",
                        name: "时钟同步与授时模块"
                      }
                    ]
                  },
                  {
                    id: "techhw-38-17",
                    name: "软件底座与通用算力",
                    children: [
                      {
                        id: "techhw-38-18",
                        name: "网络操作系统与嵌入式软件"
                      },
                      {
                        id: "techhw-38-19",
                        name: "虚拟化与容器平台"
                      },
                      {
                        id: "techhw-38-20",
                        name: "SDN与网络编排平台"
                      },
                      {
                        id: "techhw-38-21",
                        name: "通用服务器与边缘算力节点"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-38-22",
                name: "网络设备体系",
                children: [
                  {
                    id: "techhw-38-23",
                    name: "无线接入设备",
                    children: [
                      {
                        id: "techhw-38-24",
                        name: "宏基站AAU与天线阵列"
                      },
                      {
                        id: "techhw-38-25",
                        name: "RRU与射频拉远单元"
                      },
                      {
                        id: "techhw-38-26",
                        name: "BBU与基带池设备"
                      },
                      {
                        id: "techhw-38-27",
                        name: "DU与CU设备"
                      },
                      {
                        id: "techhw-38-28",
                        name: "小基站与室内覆盖设备"
                      }
                    ]
                  },
                  {
                    id: "techhw-38-29",
                    name: "固网接入设备",
                    children: [
                      {
                        id: "techhw-38-30",
                        name: "OLT设备"
                      },
                      {
                        id: "techhw-38-31",
                        name: "ONU与ONT设备"
                      },
                      {
                        id: "techhw-38-32",
                        name: "接入网关与CPE设备"
                      },
                      {
                        id: "techhw-38-33",
                        name: "工业通信网关"
                      }
                    ]
                  },
                  {
                    id: "techhw-38-34",
                    name: "传输与承载设备",
                    children: [
                      {
                        id: "techhw-38-35",
                        name: "WDM与OTN设备"
                      },
                      {
                        id: "techhw-38-36",
                        name: "PTN与SPN设备"
                      },
                      {
                        id: "techhw-38-37",
                        name: "IP RAN设备"
                      },
                      {
                        id: "techhw-38-38",
                        name: "核心路由器与交换机"
                      },
                      {
                        id: "techhw-38-39",
                        name: "微波与毫米波回传设备"
                      }
                    ]
                  },
                  {
                    id: "techhw-38-40",
                    name: "核心网与控制设备",
                    children: [
                      {
                        id: "techhw-38-41",
                        name: "5GC与EPC网元"
                      },
                      {
                        id: "techhw-38-42",
                        name: "IMS与会话控制设备"
                      },
                      {
                        id: "techhw-38-43",
                        name: "SBC与安全边界设备"
                      },
                      {
                        id: "techhw-38-44",
                        name: "信令与网络控制平台"
                      }
                    ]
                  },
                  {
                    id: "techhw-38-45",
                    name: "专网与融合通信设备",
                    children: [
                      {
                        id: "techhw-38-46",
                        name: "行业专网一体化设备"
                      },
                      {
                        id: "techhw-38-47",
                        name: "指挥调度与集群通信设备"
                      },
                      {
                        id: "techhw-38-48",
                        name: "边缘通信控制设备"
                      },
                      {
                        id: "techhw-38-49",
                        name: "融合接入与业务网关"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-38-50",
                name: "集成部署与验证保障",
                children: [
                  {
                    id: "techhw-38-51",
                    name: "系统集成与网络建设",
                    children: [
                      {
                        id: "techhw-38-52",
                        name: "站点工程与机房配套"
                      },
                      {
                        id: "techhw-38-53",
                        name: "传输开通与网络割接"
                      },
                      {
                        id: "techhw-38-54",
                        name: "多厂商互联互通集成"
                      },
                      {
                        id: "techhw-38-55",
                        name: "专网交付与定制化部署"
                      }
                    ]
                  },
                  {
                    id: "techhw-38-56",
                    name: "测试验证与认证",
                    children: [
                      {
                        id: "techhw-38-57",
                        name: "协议一致性测试系统"
                      },
                      {
                        id: "techhw-38-58",
                        name: "射频与性能测试设备"
                      },
                      {
                        id: "techhw-38-59",
                        name: "OTIC与开放接口测试"
                      },
                      {
                        id: "techhw-38-60",
                        name: "环境可靠性与EMC测试"
                      }
                    ]
                  },
                  {
                    id: "techhw-38-61",
                    name: "运维管理与优化",
                    children: [
                      {
                        id: "techhw-38-62",
                        name: "EMS与NMS平台"
                      },
                      {
                        id: "techhw-38-63",
                        name: "网络自动化与自智运维系统"
                      },
                      {
                        id: "techhw-38-64",
                        name: "能耗管理与节能控制系统"
                      },
                      {
                        id: "techhw-38-65",
                        name: "安全监测与故障定位系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-38-66",
                name: "应用场景与产业生态",
                children: [
                  {
                    id: "techhw-38-67",
                    name: "公共通信网络",
                    children: [
                      {
                        id: "techhw-38-68",
                        name: "运营商移动通信网络"
                      },
                      {
                        id: "techhw-38-69",
                        name: "固定宽带与家庭网络"
                      },
                      {
                        id: "techhw-38-70",
                        name: "政企专线与城域承载网络"
                      }
                    ]
                  },
                  {
                    id: "techhw-38-71",
                    name: "行业数字化网络",
                    children: [
                      {
                        id: "techhw-38-72",
                        name: "工业互联网与园区专网"
                      },
                      {
                        id: "techhw-38-73",
                        name: "电力交通与应急通信网络"
                      },
                      {
                        id: "techhw-38-74",
                        name: "医疗教育与城市治理网络"
                      }
                    ]
                  },
                  {
                    id: "techhw-38-75",
                    name: "新型网络演进",
                    children: [
                      {
                        id: "techhw-38-76",
                        name: "5G独立组网与网络切片"
                      },
                      {
                        id: "techhw-38-77",
                        name: "F5G与全光网络"
                      },
                      {
                        id: "techhw-38-78",
                        name: "开放RAN与云化核心网"
                      },
                      {
                        id: "techhw-38-79",
                        name: "数据中心互联与智能承载网络"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    midstream: {
      label: "中游",
      root: {
        id: "techhw-midstream",
        name: "技术硬件",
        children: [
          {
            id: "techhw-39",
            name: "工业控制计算机系统",
            children: [
              {
                id: "techhw-39-1",
                name: "核心器件与基础平台",
                children: [
                  {
                    id: "techhw-39-2",
                    name: "处理器与计算平台",
                    children: [
                      {
                        id: "techhw-39-3",
                        name: "x86处理器"
                      },
                      {
                        id: "techhw-39-4",
                        name: "ARM处理器与SoC"
                      },
                      {
                        id: "techhw-39-5",
                        name: "GPU、FPGA与AI加速器"
                      }
                    ]
                  },
                  {
                    id: "techhw-39-6",
                    name: "工业主板与模块化硬件",
                    children: [
                      {
                        id: "techhw-39-7",
                        name: "工业主板"
                      },
                      {
                        id: "techhw-39-8",
                        name: "COM模块与载板"
                      },
                      {
                        id: "techhw-39-9",
                        name: "背板与扩展总线"
                      }
                    ]
                  },
                  {
                    id: "techhw-39-10",
                    name: "存储、电源与结构可靠性",
                    children: [
                      {
                        id: "techhw-39-11",
                        name: "工业内存与工业级SSD"
                      },
                      {
                        id: "techhw-39-12",
                        name: "工业电源、UPS与电源管理"
                      },
                      {
                        id: "techhw-39-13",
                        name: "散热、机箱、EMC与防护"
                      }
                    ]
                  },
                  {
                    id: "techhw-39-14",
                    name: "通信与接口部件",
                    children: [
                      {
                        id: "techhw-39-15",
                        name: "工业以太网与TSN"
                      },
                      {
                        id: "techhw-39-16",
                        name: "现场总线与串行通信"
                      },
                      {
                        id: "techhw-39-17",
                        name: "采集卡、运动控制卡与扩展I/O"
                      }
                    ]
                  },
                  {
                    id: "techhw-39-18",
                    name: "系统软件与安全底座",
                    children: [
                      {
                        id: "techhw-39-19",
                        name: "实时操作系统与嵌入式操作系统"
                      },
                      {
                        id: "techhw-39-20",
                        name: "虚拟化、容器与边缘管理"
                      },
                      {
                        id: "techhw-39-21",
                        name: "固件、可信根与安全加固"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-39-22",
                name: "产品形态与控制运行体系",
                children: [
                  {
                    id: "techhw-39-23",
                    name: "工控机整机",
                    children: [
                      {
                        id: "techhw-39-24",
                        name: "Box IPC"
                      },
                      {
                        id: "techhw-39-25",
                        name: "Panel IPC"
                      },
                      {
                        id: "techhw-39-26",
                        name: "Rack IPC"
                      },
                      {
                        id: "techhw-39-27",
                        name: "Embedded IPC与边缘网关"
                      }
                    ]
                  },
                  {
                    id: "techhw-39-28",
                    name: "控制运行环境",
                    children: [
                      {
                        id: "techhw-39-29",
                        name: "Soft PLC与控制运行时"
                      },
                      {
                        id: "techhw-39-30",
                        name: "HMI、SCADA运行环境"
                      },
                      {
                        id: "techhw-39-31",
                        name: "协议转换与数据采集软件"
                      }
                    ]
                  },
                  {
                    id: "techhw-39-32",
                    name: "边缘计算与智能功能",
                    children: [
                      {
                        id: "techhw-39-33",
                        name: "设备侧数据处理"
                      },
                      {
                        id: "techhw-39-34",
                        name: "机器视觉与AI推理"
                      },
                      {
                        id: "techhw-39-35",
                        name: "设备管理与远程运维"
                      }
                    ]
                  },
                  {
                    id: "techhw-39-36",
                    name: "配套与扩展",
                    children: [
                      {
                        id: "techhw-39-37",
                        name: "工业显示与触控终端"
                      },
                      {
                        id: "techhw-39-38",
                        name: "网络与安全设备"
                      },
                      {
                        id: "techhw-39-39",
                        name: "外设与配件"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-39-40",
                name: "制造交付与系统集成",
                children: [
                  {
                    id: "techhw-39-41",
                    name: "研发设计与适配",
                    children: [
                      {
                        id: "techhw-39-42",
                        name: "硬件设计与BSP适配"
                      },
                      {
                        id: "techhw-39-43",
                        name: "操作系统与驱动适配"
                      },
                      {
                        id: "techhw-39-44",
                        name: "应用软件与行业方案开发"
                      }
                    ]
                  },
                  {
                    id: "techhw-39-45",
                    name: "生产制造与测试验证",
                    children: [
                      {
                        id: "techhw-39-46",
                        name: "SMT与整机装配"
                      },
                      {
                        id: "techhw-39-47",
                        name: "环境与可靠性测试"
                      },
                      {
                        id: "techhw-39-48",
                        name: "EMC、安规与行业认证"
                      }
                    ]
                  },
                  {
                    id: "techhw-39-49",
                    name: "集成交付",
                    children: [
                      {
                        id: "techhw-39-50",
                        name: "控制柜与机台集成"
                      },
                      {
                        id: "techhw-39-51",
                        name: "产线系统集成"
                      },
                      {
                        id: "techhw-39-52",
                        name: "调试、验收与导入"
                      }
                    ]
                  },
                  {
                    id: "techhw-39-53",
                    name: "生命周期服务",
                    children: [
                      {
                        id: "techhw-39-54",
                        name: "长周期供货与备件"
                      },
                      {
                        id: "techhw-39-55",
                        name: "远程维护与升级"
                      },
                      {
                        id: "techhw-39-56",
                        name: "信息安全与补丁管理"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-39-57",
                name: "应用场景与产业生态",
                children: [
                  {
                    id: "techhw-39-58",
                    name: "离散制造",
                    children: [
                      {
                        id: "techhw-39-59",
                        name: "机床与装备制造"
                      },
                      {
                        id: "techhw-39-60",
                        name: "汽车与零部件"
                      },
                      {
                        id: "techhw-39-61",
                        name: "电子与半导体设备"
                      }
                    ]
                  },
                  {
                    id: "techhw-39-62",
                    name: "流程工业",
                    children: [
                      {
                        id: "techhw-39-63",
                        name: "化工与冶金"
                      },
                      {
                        id: "techhw-39-64",
                        name: "电力与能源"
                      },
                      {
                        id: "techhw-39-65",
                        name: "食品医药与水务"
                      }
                    ]
                  },
                  {
                    id: "techhw-39-66",
                    name: "基础设施与特种场景",
                    children: [
                      {
                        id: "techhw-39-67",
                        name: "轨道交通"
                      },
                      {
                        id: "techhw-39-68",
                        name: "楼宇与市政"
                      },
                      {
                        id: "techhw-39-69",
                        name: "仓储物流与港口"
                      }
                    ]
                  },
                  {
                    id: "techhw-39-70",
                    name: "产业协同生态",
                    children: [
                      {
                        id: "techhw-39-71",
                        name: "自动化软件与平台"
                      },
                      {
                        id: "techhw-39-72",
                        name: "通信标准与互联生态"
                      },
                      {
                        id: "techhw-39-73",
                        name: "渠道、集成商与服务商"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    downstream: {
      label: "下游",
      root: {
        id: "techhw-downstream",
        name: "电子元件",
        children: [
          {
            id: "techhw-40",
            name: "高端电子电路",
            children: [
              {
                id: "techhw-40-1",
                name: "关键材料与装备底座",
                children: [
                  {
                    id: "techhw-40-2",
                    name: "基材与导体材料",
                    children: [
                      {
                        id: "techhw-40-3",
                        name: "高频高速基材"
                      },
                      {
                        id: "techhw-40-4",
                        name: "ABF/BT 载板材料"
                      },
                      {
                        id: "techhw-40-5",
                        name: "FCCL/PI 柔性材料"
                      },
                      {
                        id: "techhw-40-6",
                        name: "铜箔与玻纤布"
                      }
                    ]
                  },
                  {
                    id: "techhw-40-7",
                    name: "制程化学品与辅材",
                    children: [
                      {
                        id: "techhw-40-8",
                        name: "干膜与阻焊材料"
                      },
                      {
                        id: "techhw-40-9",
                        name: "电镀与化学铜药液"
                      },
                      {
                        id: "techhw-40-10",
                        name: "表面处理材料"
                      }
                    ]
                  },
                  {
                    id: "techhw-40-11",
                    name: "工艺装备与软件",
                    children: [
                      {
                        id: "techhw-40-12",
                        name: "EDA/CAM/仿真软件"
                      },
                      {
                        id: "techhw-40-13",
                        name: "钻孔与激光加工设备"
                      },
                      {
                        id: "techhw-40-14",
                        name: "曝光成像与蚀刻设备"
                      },
                      {
                        id: "techhw-40-15",
                        name: "层压压合与电镀设备"
                      },
                      {
                        id: "techhw-40-16",
                        name: "AOI/AXI/电测设备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-40-17",
                name: "制造与过程工程",
                children: [
                  {
                    id: "techhw-40-18",
                    name: "电路设计与工程导入",
                    children: [
                      {
                        id: "techhw-40-19",
                        name: "版图设计与叠构设计"
                      },
                      {
                        id: "techhw-40-20",
                        name: "阻抗与热设计"
                      },
                      {
                        id: "techhw-40-21",
                        name: "DFM/DFT 工程评审"
                      }
                    ]
                  },
                  {
                    id: "techhw-40-22",
                    name: "板级制造",
                    children: [
                      {
                        id: "techhw-40-23",
                        name: "高多层板制造"
                      },
                      {
                        id: "techhw-40-24",
                        name: "HDI/Anylayer 制造"
                      },
                      {
                        id: "techhw-40-25",
                        name: "高频高速板制造"
                      },
                      {
                        id: "techhw-40-26",
                        name: "FPC/刚挠板制造"
                      }
                    ]
                  },
                  {
                    id: "techhw-40-27",
                    name: "封装载板与先进互连",
                    children: [
                      {
                        id: "techhw-40-28",
                        name: "FC-BGA/FC-CSP 载板"
                      },
                      {
                        id: "techhw-40-29",
                        name: "SiP/AiP 载板"
                      },
                      {
                        id: "techhw-40-30",
                        name: "RDL/中介层/玻璃基互连"
                      }
                    ]
                  },
                  {
                    id: "techhw-40-31",
                    name: "组装测试与验证",
                    children: [
                      {
                        id: "techhw-40-32",
                        name: "SMT 与微组装"
                      },
                      {
                        id: "techhw-40-33",
                        name: "电性测试与飞针测试"
                      },
                      {
                        id: "techhw-40-34",
                        name: "环境与可靠性验证"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-40-35",
                name: "产品体系与关键技术",
                children: [
                  {
                    id: "techhw-40-36",
                    name: "高性能板级产品",
                    children: [
                      {
                        id: "techhw-40-37",
                        name: "高多层板"
                      },
                      {
                        id: "techhw-40-38",
                        name: "HDI/SLP"
                      },
                      {
                        id: "techhw-40-39",
                        name: "高频高速板"
                      },
                      {
                        id: "techhw-40-40",
                        name: "厚铜与散热板"
                      }
                    ]
                  },
                  {
                    id: "techhw-40-41",
                    name: "封装互连产品",
                    children: [
                      {
                        id: "techhw-40-42",
                        name: "IC 封装载板"
                      },
                      {
                        id: "techhw-40-43",
                        name: "模组基板"
                      },
                      {
                        id: "techhw-40-44",
                        name: "天线封装与系统级封装基板"
                      }
                    ]
                  },
                  {
                    id: "techhw-40-45",
                    name: "柔性与异形电子电路",
                    children: [
                      {
                        id: "techhw-40-46",
                        name: "FPC"
                      },
                      {
                        id: "techhw-40-47",
                        name: "刚挠结合板"
                      },
                      {
                        id: "techhw-40-48",
                        name: "嵌埋器件与三维互连"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-40-49",
                name: "应用场景与产业生态",
                children: [
                  {
                    id: "techhw-40-50",
                    name: "算力与通信基础设施",
                    children: [
                      {
                        id: "techhw-40-51",
                        name: "AI 服务器与加速卡"
                      },
                      {
                        id: "techhw-40-52",
                        name: "数据中心交换与光模块"
                      },
                      {
                        id: "techhw-40-53",
                        name: "5G/6G 与卫星通信"
                      }
                    ]
                  },
                  {
                    id: "techhw-40-54",
                    name: "智能终端与汽车电子",
                    children: [
                      {
                        id: "techhw-40-55",
                        name: "智能手机与 PC"
                      },
                      {
                        id: "techhw-40-56",
                        name: "可穿戴与 XR 设备"
                      },
                      {
                        id: "techhw-40-57",
                        name: "新能源汽车与智能驾驶"
                      }
                    ]
                  },
                  {
                    id: "techhw-40-58",
                    name: "高可靠与专用领域",
                    children: [
                      {
                        id: "techhw-40-59",
                        name: "工业控制与机器人"
                      },
                      {
                        id: "techhw-40-60",
                        name: "医疗电子"
                      },
                      {
                        id: "techhw-40-61",
                        name: "航空航天与军工电子"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "techhw-41",
            name: "高端传感器",
            children: [
              {
                id: "techhw-41-1",
                name: "关键材料与核心部件",
                children: [
                  {
                    id: "techhw-41-2",
                    name: "材料与晶圆底座",
                    children: [
                      {
                        id: "techhw-41-3",
                        name: "硅基与 SOI 晶圆"
                      },
                      {
                        id: "techhw-41-4",
                        name: "压电与声学材料"
                      },
                      {
                        id: "techhw-41-5",
                        name: "III-V 与化合物半导体材料"
                      },
                      {
                        id: "techhw-41-6",
                        name: "光学与红外材料"
                      },
                      {
                        id: "techhw-41-7",
                        name: "功能薄膜与敏感材料"
                      },
                      {
                        id: "techhw-41-8",
                        name: "生物识别与微流控材料"
                      }
                    ]
                  },
                  {
                    id: "techhw-41-9",
                    name: "核心器件与基础单元",
                    children: [
                      {
                        id: "techhw-41-10",
                        name: "MEMS 敏感结构"
                      },
                      {
                        id: "techhw-41-11",
                        name: "光源与探测器"
                      },
                      {
                        id: "techhw-41-12",
                        name: "天线与射频前端"
                      },
                      {
                        id: "techhw-41-13",
                        name: "ASIC、AFE 与 MCU"
                      },
                      {
                        id: "techhw-41-14",
                        name: "光学镜头与滤光片"
                      },
                      {
                        id: "techhw-41-15",
                        name: "封装基板与互连材料"
                      }
                    ]
                  },
                  {
                    id: "techhw-41-16",
                    name: "装备与软件工具",
                    children: [
                      {
                        id: "techhw-41-17",
                        name: "EDA、IP 与算法工具链"
                      },
                      {
                        id: "techhw-41-18",
                        name: "光刻、刻蚀、沉积与键合设备"
                      },
                      {
                        id: "techhw-41-19",
                        name: "晶圆检测与失效分析设备"
                      },
                      {
                        id: "techhw-41-20",
                        name: "封装、测试与校准设备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-41-21",
                name: "制造与过程工程",
                children: [
                  {
                    id: "techhw-41-22",
                    name: "设计与晶圆制造",
                    children: [
                      {
                        id: "techhw-41-23",
                        name: "传感器架构与协同设计"
                      },
                      {
                        id: "techhw-41-24",
                        name: "MEMS 与 NEMS 工艺"
                      },
                      {
                        id: "techhw-41-25",
                        name: "CIS、ToF、SPAD 与 SWIR 工艺"
                      },
                      {
                        id: "techhw-41-26",
                        name: "射频与毫米波工艺"
                      }
                    ]
                  },
                  {
                    id: "techhw-41-27",
                    name: "封装与模组集成",
                    children: [
                      {
                        id: "techhw-41-28",
                        name: "WLP、CSP 与 SiP 封装"
                      },
                      {
                        id: "techhw-41-29",
                        name: "光机电一体化封装"
                      },
                      {
                        id: "techhw-41-30",
                        name: "真空与气密封装"
                      },
                      {
                        id: "techhw-41-31",
                        name: "多传感融合模组"
                      }
                    ]
                  },
                  {
                    id: "techhw-41-32",
                    name: "测试校准与可靠性",
                    children: [
                      {
                        id: "techhw-41-33",
                        name: "晶圆级测试"
                      },
                      {
                        id: "techhw-41-34",
                        name: "标定与补偿"
                      },
                      {
                        id: "techhw-41-35",
                        name: "车规级验证"
                      },
                      {
                        id: "techhw-41-36",
                        name: "医工与工业认证"
                      }
                    ]
                  },
                  {
                    id: "techhw-41-37",
                    name: "嵌入式软件与系统集成",
                    children: [
                      {
                        id: "techhw-41-38",
                        name: "边缘算法与信号处理"
                      },
                      {
                        id: "techhw-41-39",
                        name: "驱动固件与接口协议"
                      },
                      {
                        id: "techhw-41-40",
                        name: "功耗与安全设计"
                      },
                      {
                        id: "techhw-41-41",
                        name: "传感器融合与自诊断"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-41-42",
                name: "产品体系与关键技术",
                children: [
                  {
                    id: "techhw-41-43",
                    name: "物理量传感器",
                    children: [
                      {
                        id: "techhw-41-44",
                        name: "压力与差压传感器"
                      },
                      {
                        id: "techhw-41-45",
                        name: "惯性传感器与 IMU"
                      },
                      {
                        id: "techhw-41-46",
                        name: "磁传感器与电流传感器"
                      },
                      {
                        id: "techhw-41-47",
                        name: "声学与超声传感器"
                      }
                    ]
                  },
                  {
                    id: "techhw-41-48",
                    name: "光电与成像传感器",
                    children: [
                      {
                        id: "techhw-41-49",
                        name: "CMOS 图像传感器"
                      },
                      {
                        id: "techhw-41-50",
                        name: "红外与热成像传感器"
                      },
                      {
                        id: "techhw-41-51",
                        name: "ToF 与 3D 视觉传感器"
                      },
                      {
                        id: "techhw-41-52",
                        name: "光谱与光纤传感器"
                      }
                    ]
                  },
                  {
                    id: "techhw-41-53",
                    name: "环境与化学生物传感器",
                    children: [
                      {
                        id: "techhw-41-54",
                        name: "气体传感器"
                      },
                      {
                        id: "techhw-41-55",
                        name: "电化学与液体分析传感器"
                      },
                      {
                        id: "techhw-41-56",
                        name: "生物传感器与可穿戴检测"
                      },
                      {
                        id: "techhw-41-57",
                        name: "微流控与实验室芯片传感"
                      }
                    ]
                  },
                  {
                    id: "techhw-41-58",
                    name: "前沿高端传感器",
                    children: [
                      {
                        id: "techhw-41-59",
                        name: "激光雷达传感器"
                      },
                      {
                        id: "techhw-41-60",
                        name: "毫米波雷达感知芯片与模组"
                      },
                      {
                        id: "techhw-41-61",
                        name: "量子传感器"
                      },
                      {
                        id: "techhw-41-62",
                        name: "多模态融合感知系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-41-63",
                name: "应用场景与产业生态",
                children: [
                  {
                    id: "techhw-41-64",
                    name: "汽车与智能出行",
                    children: [
                      {
                        id: "techhw-41-65",
                        name: "ADAS 与自动驾驶"
                      },
                      {
                        id: "techhw-41-66",
                        name: "车身底盘与安全控制"
                      },
                      {
                        id: "techhw-41-67",
                        name: "动力电池与热管理"
                      },
                      {
                        id: "techhw-41-68",
                        name: "车内感知与座舱监测"
                      }
                    ]
                  },
                  {
                    id: "techhw-41-69",
                    name: "工业自动化与机器人",
                    children: [
                      {
                        id: "techhw-41-70",
                        name: "工厂自动化"
                      },
                      {
                        id: "techhw-41-71",
                        name: "机器视觉与协作机器人"
                      },
                      {
                        id: "techhw-41-72",
                        name: "预测性维护"
                      },
                      {
                        id: "techhw-41-73",
                        name: "高端装备状态监测"
                      }
                    ]
                  },
                  {
                    id: "techhw-41-74",
                    name: "医疗健康与生命科学",
                    children: [
                      {
                        id: "techhw-41-75",
                        name: "体外诊断"
                      },
                      {
                        id: "techhw-41-76",
                        name: "连续生命体征监测"
                      },
                      {
                        id: "techhw-41-77",
                        name: "医疗影像与介入导航"
                      },
                      {
                        id: "techhw-41-78",
                        name: "可穿戴与家用医疗"
                      }
                    ]
                  },
                  {
                    id: "techhw-41-79",
                    name: "能源环境与国防航天",
                    children: [
                      {
                        id: "techhw-41-80",
                        name: "电力与能源设施监测"
                      },
                      {
                        id: "techhw-41-81",
                        name: "环境与气候监测"
                      },
                      {
                        id: "techhw-41-82",
                        name: "航空航天与卫星载荷"
                      },
                      {
                        id: "techhw-41-83",
                        name: "国防侦测与导航定位"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "techhw-42",
            name: "新型显示器件",
            children: [
              {
                id: "techhw-42-1",
                name: "关键材料与基础器件",
                children: [
                  {
                    id: "techhw-42-2",
                    name: "基板与背板",
                    children: [
                      {
                        id: "techhw-42-3",
                        name: "玻璃基板"
                      },
                      {
                        id: "techhw-42-4",
                        name: "PI基材与UTG"
                      },
                      {
                        id: "techhw-42-5",
                        name: "硅基背板与CMOS"
                      },
                      {
                        id: "techhw-42-6",
                        name: "LTPS LTPO Oxide IGZO背板体系"
                      }
                    ]
                  },
                  {
                    id: "techhw-42-7",
                    name: "发光与显示材料",
                    children: [
                      {
                        id: "techhw-42-8",
                        name: "液晶与配向材料"
                      },
                      {
                        id: "techhw-42-9",
                        name: "OLED有机发光与功能材料"
                      },
                      {
                        id: "techhw-42-10",
                        name: "量子点与色转换材料"
                      },
                      {
                        id: "techhw-42-11",
                        name: "电泳与电子纸材料"
                      }
                    ]
                  },
                  {
                    id: "techhw-42-12",
                    name: "光学与结构部件",
                    children: [
                      {
                        id: "techhw-42-13",
                        name: "偏光片"
                      },
                      {
                        id: "techhw-42-14",
                        name: "彩色滤光片与光刻胶"
                      },
                      {
                        id: "techhw-42-15",
                        name: "盖板玻璃与柔性盖板"
                      },
                      {
                        id: "techhw-42-16",
                        name: "薄膜封装与阻隔材料"
                      },
                      {
                        id: "techhw-42-17",
                        name: "胶黏剂与贴合材料"
                      }
                    ]
                  },
                  {
                    id: "techhw-42-18",
                    name: "驱动与控制器件",
                    children: [
                      {
                        id: "techhw-42-19",
                        name: "显示驱动IC"
                      },
                      {
                        id: "techhw-42-20",
                        name: "时序控制与电源管理芯片"
                      },
                      {
                        id: "techhw-42-21",
                        name: "触控与指纹集成器件"
                      },
                      {
                        id: "techhw-42-22",
                        name: "传感与校正器件"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-42-23",
                name: "器件制造与过程工程",
                children: [
                  {
                    id: "techhw-42-24",
                    name: "背板与阵列工程",
                    children: [
                      {
                        id: "techhw-42-25",
                        name: "TFT阵列制程"
                      },
                      {
                        id: "techhw-42-26",
                        name: "氧化物 LTPS LTPO背板制程"
                      },
                      {
                        id: "techhw-42-27",
                        name: "CMOS硅基背板制程"
                      }
                    ]
                  },
                  {
                    id: "techhw-42-28",
                    name: "显示器件制备",
                    children: [
                      {
                        id: "techhw-42-29",
                        name: "LCD面板成盒与背光集成"
                      },
                      {
                        id: "techhw-42-30",
                        name: "OLED蒸镀与图形化"
                      },
                      {
                        id: "techhw-42-31",
                        name: "QD OLED与色转换制程"
                      },
                      {
                        id: "techhw-42-32",
                        name: "Micro LED外延与芯片制备"
                      },
                      {
                        id: "techhw-42-33",
                        name: "Micro LED巨量转移与键合"
                      },
                      {
                        id: "techhw-42-34",
                        name: "电子纸前板制备"
                      }
                    ]
                  },
                  {
                    id: "techhw-42-35",
                    name: "封装 模组与良率工程",
                    children: [
                      {
                        id: "techhw-42-36",
                        name: "薄膜封装与盖板封装"
                      },
                      {
                        id: "techhw-42-37",
                        name: "切割 邦定与贴合"
                      },
                      {
                        id: "techhw-42-38",
                        name: "模组组装与驱动集成"
                      },
                      {
                        id: "techhw-42-39",
                        name: "AOI 电测 Demura与修复"
                      }
                    ]
                  },
                  {
                    id: "techhw-42-40",
                    name: "核心装备",
                    children: [
                      {
                        id: "techhw-42-41",
                        name: "CVD PVD 光刻 蚀刻与清洗设备"
                      },
                      {
                        id: "techhw-42-42",
                        name: "蒸镀设备与精细金属掩膜版"
                      },
                      {
                        id: "techhw-42-43",
                        name: "印刷 涂布与涂胶设备"
                      },
                      {
                        id: "techhw-42-44",
                        name: "激光剥离 退火 切割与修复设备"
                      },
                      {
                        id: "techhw-42-45",
                        name: "巨量转移 键合 量测与可靠性设备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-42-46",
                name: "产品体系与模组集成",
                children: [
                  {
                    id: "techhw-42-47",
                    name: "中小尺寸显示",
                    children: [
                      {
                        id: "techhw-42-48",
                        name: "智能手机显示"
                      },
                      {
                        id: "techhw-42-49",
                        name: "平板与笔记本显示"
                      },
                      {
                        id: "techhw-42-50",
                        name: "智能穿戴显示"
                      }
                    ]
                  },
                  {
                    id: "techhw-42-51",
                    name: "大尺寸显示",
                    children: [
                      {
                        id: "techhw-42-52",
                        name: "电视用OLED与QD OLED"
                      },
                      {
                        id: "techhw-42-53",
                        name: "显示器用OLED与Mini LED"
                      },
                      {
                        id: "techhw-42-54",
                        name: "商显拼接与透明显示"
                      }
                    ]
                  },
                  {
                    id: "techhw-42-55",
                    name: "微显示与空间计算",
                    children: [
                      {
                        id: "techhw-42-56",
                        name: "OLEDoS微显示"
                      },
                      {
                        id: "techhw-42-57",
                        name: "Micro LED微显示"
                      },
                      {
                        id: "techhw-42-58",
                        name: "光波导与显示模组集成"
                      }
                    ]
                  },
                  {
                    id: "techhw-42-59",
                    name: "车载与专用显示",
                    children: [
                      {
                        id: "techhw-42-60",
                        name: "仪表 中控与副驾显示"
                      },
                      {
                        id: "techhw-42-61",
                        name: "HUD与抬头显示"
                      },
                      {
                        id: "techhw-42-62",
                        name: "工控 医疗 航空航海显示"
                      }
                    ]
                  },
                  {
                    id: "techhw-42-63",
                    name: "低功耗与反射式显示",
                    children: [
                      {
                        id: "techhw-42-64",
                        name: "电子书阅读器"
                      },
                      {
                        id: "techhw-42-65",
                        name: "电子货架标签"
                      },
                      {
                        id: "techhw-42-66",
                        name: "数字标牌与公共信息看板"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-42-67",
                name: "应用场景与产业协同",
                children: [
                  {
                    id: "techhw-42-68",
                    name: "消费电子",
                    children: [
                      {
                        id: "techhw-42-69",
                        name: "手机 平板 笔记本 电视 显示器"
                      }
                    ]
                  },
                  {
                    id: "techhw-42-70",
                    name: "智能汽车",
                    children: [
                      {
                        id: "techhw-42-71",
                        name: "智能座舱 后排娱乐 HUD 车窗显示"
                      }
                    ]
                  },
                  {
                    id: "techhw-42-72",
                    name: "XR与可穿戴",
                    children: [
                      {
                        id: "techhw-42-73",
                        name: "AR VR MR头显"
                      },
                      {
                        id: "techhw-42-74",
                        name: "智能眼镜与可穿戴设备"
                      }
                    ]
                  },
                  {
                    id: "techhw-42-75",
                    name: "商业与公共空间",
                    children: [
                      {
                        id: "techhw-42-76",
                        name: "零售广告 会展 文旅 演播"
                      }
                    ]
                  },
                  {
                    id: "techhw-42-77",
                    name: "工业与公共服务",
                    children: [
                      {
                        id: "techhw-42-78",
                        name: "工业控制 医疗教育 轨交机场"
                      }
                    ]
                  },
                  {
                    id: "techhw-42-79",
                    name: "绿色制造与循环利用",
                    children: [
                      {
                        id: "techhw-42-80",
                        name: "节能制造"
                      },
                      {
                        id: "techhw-42-81",
                        name: "面板回收与材料再利用"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "techhw-43",
            name: "激光雷达光电子器件",
            children: [
              {
                id: "techhw-43-1",
                name: "关键材料与工艺平台",
                children: [
                  {
                    id: "techhw-43-2",
                    name: "发射端材料与外延",
                    children: [
                      {
                        id: "techhw-43-3",
                        name: "GaAs与AlGaAs外延片"
                      },
                      {
                        id: "techhw-43-4",
                        name: "InP外延片"
                      },
                      {
                        id: "techhw-43-5",
                        name: "EEL与DFB激光材料体系"
                      }
                    ]
                  },
                  {
                    id: "techhw-43-6",
                    name: "接收端材料与制造平台",
                    children: [
                      {
                        id: "techhw-43-7",
                        name: "CMOS与SPAD工艺平台"
                      },
                      {
                        id: "techhw-43-8",
                        name: "Si APD与SiPM工艺平台"
                      },
                      {
                        id: "techhw-43-9",
                        name: "InGaAs与InP探测器材料体系"
                      }
                    ]
                  },
                  {
                    id: "techhw-43-10",
                    name: "光学与封装材料",
                    children: [
                      {
                        id: "techhw-43-11",
                        name: "光学玻璃与红外窗口材料"
                      },
                      {
                        id: "techhw-43-12",
                        name: "微透镜与DOE衍射光学元件"
                      },
                      {
                        id: "techhw-43-13",
                        name: "封装基板与导热粘结材料"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-43-14",
                name: "核心光电子器件",
                children: [
                  {
                    id: "techhw-43-15",
                    name: "发射器件",
                    children: [
                      {
                        id: "techhw-43-16",
                        name: "VCSEL阵列"
                      },
                      {
                        id: "techhw-43-17",
                        name: "AR-VCSEL器件"
                      },
                      {
                        id: "techhw-43-18",
                        name: "EEL与DFB半导体激光器"
                      }
                    ]
                  },
                  {
                    id: "techhw-43-19",
                    name: "接收器件",
                    children: [
                      {
                        id: "techhw-43-20",
                        name: "SPAD深度传感器"
                      },
                      {
                        id: "techhw-43-21",
                        name: "SiPM与MPPC器件"
                      },
                      {
                        id: "techhw-43-22",
                        name: "Si APD器件"
                      },
                      {
                        id: "techhw-43-23",
                        name: "InGaAs APD器件"
                      }
                    ]
                  },
                  {
                    id: "techhw-43-24",
                    name: "波束控制与收发光路",
                    children: [
                      {
                        id: "techhw-43-25",
                        name: "MEMS微振镜"
                      },
                      {
                        id: "techhw-43-26",
                        name: "OPA与PIC波束控制器件"
                      },
                      {
                        id: "techhw-43-27",
                        name: "准直整形滤光与分束光学器件"
                      },
                      {
                        id: "techhw-43-28",
                        name: "收发同轴与异轴光路组件"
                      }
                    ]
                  },
                  {
                    id: "techhw-43-29",
                    name: "配套电子器件",
                    children: [
                      {
                        id: "techhw-43-30",
                        name: "激光驱动芯片"
                      },
                      {
                        id: "techhw-43-31",
                        name: "TIA与AFE读出芯片"
                      },
                      {
                        id: "techhw-43-32",
                        name: "ToF与FMCW信号处理芯片"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-43-33",
                name: "模组集成与制造验证",
                children: [
                  {
                    id: "techhw-43-34",
                    name: "芯片制造",
                    children: [
                      {
                        id: "techhw-43-35",
                        name: "外延生长"
                      },
                      {
                        id: "techhw-43-36",
                        name: "晶圆制造"
                      },
                      {
                        id: "techhw-43-37",
                        name: "晶圆级测试与筛选"
                      }
                    ]
                  },
                  {
                    id: "techhw-43-38",
                    name: "光机电封装",
                    children: [
                      {
                        id: "techhw-43-39",
                        name: "发射端封装"
                      },
                      {
                        id: "techhw-43-40",
                        name: "接收端封装"
                      },
                      {
                        id: "techhw-43-41",
                        name: "收发一体模组封装"
                      }
                    ]
                  },
                  {
                    id: "techhw-43-42",
                    name: "标定测试与可靠性",
                    children: [
                      {
                        id: "techhw-43-43",
                        name: "光功率与波束测试"
                      },
                      {
                        id: "techhw-43-44",
                        name: "测距精度与抗干扰测试"
                      },
                      {
                        id: "techhw-43-45",
                        name: "车规与工规可靠性验证"
                      }
                    ]
                  },
                  {
                    id: "techhw-43-46",
                    name: "生产配套",
                    children: [
                      {
                        id: "techhw-43-47",
                        name: "专用设备与自动化产线"
                      },
                      {
                        id: "techhw-43-48",
                        name: "标定软件与测试治具"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-43-49",
                name: "技术路线与应用形态",
                children: [
                  {
                    id: "techhw-43-50",
                    name: "测距路线",
                    children: [
                      {
                        id: "techhw-43-51",
                        name: "dToF路线"
                      },
                      {
                        id: "techhw-43-52",
                        name: "iToF路线"
                      },
                      {
                        id: "techhw-43-53",
                        name: "FMCW路线"
                      },
                      {
                        id: "techhw-43-54",
                        name: "Flash路线"
                      }
                    ]
                  },
                  {
                    id: "techhw-43-55",
                    name: "扫描形态",
                    children: [
                      {
                        id: "techhw-43-56",
                        name: "机械扫描"
                      },
                      {
                        id: "techhw-43-57",
                        name: "半固态扫描"
                      },
                      {
                        id: "techhw-43-58",
                        name: "全固态扫描"
                      }
                    ]
                  },
                  {
                    id: "techhw-43-59",
                    name: "重点应用",
                    children: [
                      {
                        id: "techhw-43-60",
                        name: "乘用车ADAS与高阶自动驾驶"
                      },
                      {
                        id: "techhw-43-61",
                        name: "机器人与无人系统"
                      },
                      {
                        id: "techhw-43-62",
                        name: "工业测量与安防基础设施"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "techhw-44",
            name: "红外光电探测器件",
            children: [
              {
                id: "techhw-44-1",
                name: "关键材料与基础要素",
                children: [
                  {
                    id: "techhw-44-2",
                    name: "材料与衬底体系",
                    children: [
                      {
                        id: "techhw-44-3",
                        name: "InGaAs 与 InP 体系"
                      },
                      {
                        id: "techhw-44-4",
                        name: "InAs 与 InAsSb 体系"
                      },
                      {
                        id: "techhw-44-5",
                        name: "InSb 体系"
                      },
                      {
                        id: "techhw-44-6",
                        name: "HgCdTe 与 CdZnTe 体系"
                      },
                      {
                        id: "techhw-44-7",
                        name: "II 类超晶格与应变层超晶格体系"
                      },
                      {
                        id: "techhw-44-8",
                        name: "QWIP 与相关外延结构体系"
                      },
                      {
                        id: "techhw-44-9",
                        name: "VOx 与非晶硅热敏材料体系"
                      },
                      {
                        id: "techhw-44-10",
                        name: "热电堆敏感材料体系"
                      }
                    ]
                  },
                  {
                    id: "techhw-44-11",
                    name: "光学与封装辅件",
                    children: [
                      {
                        id: "techhw-44-12",
                        name: "红外窗口材料"
                      },
                      {
                        id: "techhw-44-13",
                        name: "滤光片与光学镀膜"
                      },
                      {
                        id: "techhw-44-14",
                        name: "冷屏与光机结构件"
                      },
                      {
                        id: "techhw-44-15",
                        name: "真空封装外壳与吸气剂"
                      }
                    ]
                  },
                  {
                    id: "techhw-44-16",
                    name: "工艺与装备底座",
                    children: [
                      {
                        id: "techhw-44-17",
                        name: "外延生长装备"
                      },
                      {
                        id: "techhw-44-18",
                        name: "光刻刻蚀与钝化工艺"
                      },
                      {
                        id: "techhw-44-19",
                        name: "互连与倒装焊工艺"
                      },
                      {
                        id: "techhw-44-20",
                        name: "晶圆减薄与混成集成工艺"
                      },
                      {
                        id: "techhw-44-21",
                        name: "真空封装与制冷装调工艺"
                      },
                      {
                        id: "techhw-44-22",
                        name: "黑体标定与可靠性测试装备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-44-23",
                name: "核心器件与制造工程",
                children: [
                  {
                    id: "techhw-44-24",
                    name: "探测器技术路线",
                    children: [
                      {
                        id: "techhw-44-25",
                        name: "光子型单元探测器"
                      },
                      {
                        id: "techhw-44-26",
                        name: "光子型线阵探测器"
                      },
                      {
                        id: "techhw-44-27",
                        name: "光子型面阵焦平面探测器"
                      },
                      {
                        id: "techhw-44-28",
                        name: "热探测型单元探测器"
                      },
                      {
                        id: "techhw-44-29",
                        name: "热探测型阵列探测器"
                      },
                      {
                        id: "techhw-44-30",
                        name: "双波段与多色探测器"
                      }
                    ]
                  },
                  {
                    id: "techhw-44-31",
                    name: "读出与芯片集成",
                    children: [
                      {
                        id: "techhw-44-32",
                        name: "读出集成电路设计"
                      },
                      {
                        id: "techhw-44-33",
                        name: "读出芯片晶圆制造"
                      },
                      {
                        id: "techhw-44-34",
                        name: "探测芯片与读出芯片混成互连"
                      },
                      {
                        id: "techhw-44-35",
                        name: "模数转换与低噪声信号链"
                      },
                      {
                        id: "techhw-44-36",
                        name: "非均匀性校正与片上处理"
                      }
                    ]
                  },
                  {
                    id: "techhw-44-37",
                    name: "封装冷却与测试标定",
                    children: [
                      {
                        id: "techhw-44-38",
                        name: "常温封装器件"
                      },
                      {
                        id: "techhw-44-39",
                        name: "热电制冷组件"
                      },
                      {
                        id: "techhw-44-40",
                        name: "杜瓦制冷组件"
                      },
                      {
                        id: "techhw-44-41",
                        name: "焦平面探测组件"
                      },
                      {
                        id: "techhw-44-42",
                        name: "电光性能测试"
                      },
                      {
                        id: "techhw-44-43",
                        name: "温度与黑体标定"
                      },
                      {
                        id: "techhw-44-44",
                        name: "可靠性与环境试验"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-44-45",
                name: "模组产品与集成配套",
                children: [
                  {
                    id: "techhw-44-46",
                    name: "器件与组件产品",
                    children: [
                      {
                        id: "techhw-44-47",
                        name: "单元探测器器件"
                      },
                      {
                        id: "techhw-44-48",
                        name: "线阵探测器组件"
                      },
                      {
                        id: "techhw-44-49",
                        name: "面阵焦平面组件"
                      },
                      {
                        id: "techhw-44-50",
                        name: "带前置放大的探测器模块"
                      },
                      {
                        id: "techhw-44-51",
                        name: "制冷型探测器组件"
                      },
                      {
                        id: "techhw-44-52",
                        name: "非制冷型热像探测模组"
                      }
                    ]
                  },
                  {
                    id: "techhw-44-53",
                    name: "按波段划分的产品谱系",
                    children: [
                      {
                        id: "techhw-44-54",
                        name: "短波红外 SWIR 产品"
                      },
                      {
                        id: "techhw-44-55",
                        name: "中波红外 MWIR 产品"
                      },
                      {
                        id: "techhw-44-56",
                        name: "长波红外 LWIR 产品"
                      },
                      {
                        id: "techhw-44-57",
                        name: "甚长波红外与热红外产品"
                      }
                    ]
                  },
                  {
                    id: "techhw-44-58",
                    name: "系统集成配套",
                    children: [
                      {
                        id: "techhw-44-59",
                        name: "驱动与采集板卡"
                      },
                      {
                        id: "techhw-44-60",
                        name: "图像处理与校正软件"
                      },
                      {
                        id: "techhw-44-61",
                        name: "温控与电源管理单元"
                      },
                      {
                        id: "techhw-44-62",
                        name: "光机接口与整机适配件"
                      }
                    ]
                  }
                ]
              },
              {
                id: "techhw-44-63",
                name: "应用场景与产业生态",
                children: [
                  {
                    id: "techhw-44-64",
                    name: "国防安防",
                    children: [
                      {
                        id: "techhw-44-65",
                        name: "夜视观察"
                      },
                      {
                        id: "techhw-44-66",
                        name: "侦察监视"
                      },
                      {
                        id: "techhw-44-67",
                        name: "制导与预警"
                      },
                      {
                        id: "techhw-44-68",
                        name: "无人平台载荷"
                      }
                    ]
                  },
                  {
                    id: "techhw-44-69",
                    name: "工业与能源",
                    children: [
                      {
                        id: "techhw-44-70",
                        name: "过程控制"
                      },
                      {
                        id: "techhw-44-71",
                        name: "设备运维"
                      },
                      {
                        id: "techhw-44-72",
                        name: "无损检测"
                      },
                      {
                        id: "techhw-44-73",
                        name: "火焰监测"
                      },
                      {
                        id: "techhw-44-74",
                        name: "气体检测与光学气体成像"
                      }
                    ]
                  },
                  {
                    id: "techhw-44-75",
                    name: "汽车与智能装备",
                    children: [
                      {
                        id: "techhw-44-76",
                        name: "车载感知"
                      },
                      {
                        id: "techhw-44-77",
                        name: "驾驶辅助"
                      },
                      {
                        id: "techhw-44-78",
                        name: "机器人视觉"
                      },
                      {
                        id: "techhw-44-79",
                        name: "机器视觉与分选"
                      }
                    ]
                  },
                  {
                    id: "techhw-44-80",
                    name: "科研医疗与航天",
                    children: [
                      {
                        id: "techhw-44-81",
                        name: "天文观测"
                      },
                      {
                        id: "techhw-44-82",
                        name: "遥感载荷"
                      },
                      {
                        id: "techhw-44-83",
                        name: "高光谱成像"
                      },
                      {
                        id: "techhw-44-84",
                        name: "生命科学与医学检测"
                      },
                      {
                        id: "techhw-44-85",
                        name: "空间探测"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  semis: {
    upstream: {
      label: "上游",
      root: {
        id: "semis-upstream",
        name: "半导体材料与设备",
        children: [
          {
            id: "semis-45",
            name: "半导体前道设备",
            children: [
              {
                id: "semis-45-1",
                name: "关键基础与核心部件",
                children: [
                  {
                    id: "semis-45-2",
                    name: "精密子系统",
                    children: [
                      {
                        id: "semis-45-3",
                        name: "EUV与DUV光源及光学系统"
                      },
                      {
                        id: "semis-45-4",
                        name: "晶圆台、掩模台与精密运动平台"
                      },
                      {
                        id: "semis-45-5",
                        name: "真空泵阀、腔体与气路系统"
                      },
                      {
                        id: "semis-45-6",
                        name: "射频电源、温控与传感系统"
                      }
                    ]
                  },
                  {
                    id: "semis-45-7",
                    name: "自动化与软件底座",
                    children: [
                      {
                        id: "semis-45-8",
                        name: "EFEM、FOUP与晶圆搬送机器人"
                      },
                      {
                        id: "semis-45-9",
                        name: "工业控制器与设备接口系统"
                      },
                      {
                        id: "semis-45-10",
                        name: "工艺控制软件、EAP与调度系统"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-45-11",
                name: "图形化与结构形成装备",
                children: [
                  {
                    id: "semis-45-12",
                    name: "光刻与涂显影",
                    children: [
                      {
                        id: "semis-45-13",
                        name: "EUV光刻设备"
                      },
                      {
                        id: "semis-45-14",
                        name: "ArF浸没式及KrF等DUV光刻设备"
                      },
                      {
                        id: "semis-45-15",
                        name: "涂胶显影设备"
                      }
                    ]
                  },
                  {
                    id: "semis-45-16",
                    name: "刻蚀与图形修整",
                    children: [
                      {
                        id: "semis-45-17",
                        name: "介质刻蚀设备"
                      },
                      {
                        id: "semis-45-18",
                        name: "导体刻蚀设备"
                      },
                      {
                        id: "semis-45-19",
                        name: "原子层刻蚀与选择性去除设备"
                      }
                    ]
                  },
                  {
                    id: "semis-45-20",
                    name: "掺杂与热处理",
                    children: [
                      {
                        id: "semis-45-21",
                        name: "离子注入设备"
                      },
                      {
                        id: "semis-45-22",
                        name: "RTP、退火与扩散设备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-45-23",
                name: "薄膜生成与表面处理装备",
                children: [
                  {
                    id: "semis-45-24",
                    name: "薄膜沉积",
                    children: [
                      {
                        id: "semis-45-25",
                        name: "CVD设备"
                      },
                      {
                        id: "semis-45-26",
                        name: "ALD设备"
                      },
                      {
                        id: "semis-45-27",
                        name: "PVD设备"
                      },
                      {
                        id: "semis-45-28",
                        name: "外延生长设备"
                      }
                    ]
                  },
                  {
                    id: "semis-45-29",
                    name: "表面处理与平坦化",
                    children: [
                      {
                        id: "semis-45-30",
                        name: "单片清洗与湿法处理设备"
                      },
                      {
                        id: "semis-45-31",
                        name: "去胶、灰化与边缘处理设备"
                      },
                      {
                        id: "semis-45-32",
                        name: "CMP设备"
                      }
                    ]
                  },
                  {
                    id: "semis-45-33",
                    name: "金属化与互连辅助",
                    children: [
                      {
                        id: "semis-45-34",
                        name: "电镀与金属填充设备"
                      },
                      {
                        id: "semis-45-35",
                        name: "前清洗与表面预处理设备"
                      },
                      {
                        id: "semis-45-36",
                        name: "光罩与掩模处理设备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-45-37",
                name: "计量控制与应用生态",
                children: [
                  {
                    id: "semis-45-38",
                    name: "计量与缺陷检测",
                    children: [
                      {
                        id: "semis-45-39",
                        name: "CD、Overlay与膜厚量测设备"
                      },
                      {
                        id: "semis-45-40",
                        name: "光学缺陷检测设备"
                      },
                      {
                        id: "semis-45-41",
                        name: "eBeam检测与Review设备"
                      }
                    ]
                  },
                  {
                    id: "semis-45-42",
                    name: "过程控制与集成验证",
                    children: [
                      {
                        id: "semis-45-43",
                        name: "APC、FDC与良率分析系统"
                      },
                      {
                        id: "semis-45-44",
                        name: "设备集群平台与模块集成"
                      },
                      {
                        id: "semis-45-45",
                        name: "工艺开发、验证与二手机服务"
                      }
                    ]
                  },
                  {
                    id: "semis-45-46",
                    name: "下游应用客户",
                    children: [
                      {
                        id: "semis-45-47",
                        name: "逻辑与代工厂"
                      },
                      {
                        id: "semis-45-48",
                        name: "存储器制造厂"
                      },
                      {
                        id: "semis-45-49",
                        name: "功率、模拟与特色工艺晶圆厂"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "semis-46",
            name: "半导体封装测试设备",
            children: [
              {
                id: "semis-46-1",
                name: "关键部件与系统底座",
                children: [
                  {
                    id: "semis-46-2",
                    name: "运动与传输系统",
                    children: [
                      {
                        id: "semis-46-3",
                        name: "直线电机与伺服驱动"
                      },
                      {
                        id: "semis-46-4",
                        name: "精密导轨与丝杠平台"
                      },
                      {
                        id: "semis-46-5",
                        name: "机械手与真空吸取系统"
                      }
                    ]
                  },
                  {
                    id: "semis-46-6",
                    name: "热管理与工艺环境",
                    children: [
                      {
                        id: "semis-46-7",
                        name: "加热模组与温控平台"
                      },
                      {
                        id: "semis-46-8",
                        name: "制冷模组与热循环单元"
                      },
                      {
                        id: "semis-46-9",
                        name: "真空气路洁净与防静电系统"
                      }
                    ]
                  },
                  {
                    id: "semis-46-10",
                    name: "感知与量测控制",
                    children: [
                      {
                        id: "semis-46-11",
                        name: "工业相机与光学模组"
                      },
                      {
                        id: "semis-46-12",
                        name: "X射线与超声成像模组"
                      },
                      {
                        id: "semis-46-13",
                        name: "传感器数据采集与运动控制卡"
                      }
                    ]
                  },
                  {
                    id: "semis-46-14",
                    name: "软件与治具耗材",
                    children: [
                      {
                        id: "semis-46-15",
                        name: "设备控制软件与测试程序"
                      },
                      {
                        id: "semis-46-16",
                        name: "Handler与Prober接口通信模块"
                      },
                      {
                        id: "semis-46-17",
                        name: "探针卡测试座吸嘴夹具刀片模具"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-46-18",
                name: "封装工艺装备",
                children: [
                  {
                    id: "semis-46-19",
                    name: "晶圆预处理与重构装备",
                    children: [
                      {
                        id: "semis-46-20",
                        name: "减薄研磨抛光设备"
                      },
                      {
                        id: "semis-46-21",
                        name: "清洗涂胶显影电镀设备"
                      },
                      {
                        id: "semis-46-22",
                        name: "切割开槽重构相关设备"
                      }
                    ]
                  },
                  {
                    id: "semis-46-23",
                    name: "贴装与互连装备",
                    children: [
                      {
                        id: "semis-46-24",
                        name: "固晶与Die Attach设备"
                      },
                      {
                        id: "semis-46-25",
                        name: "倒装凸点回流设备"
                      },
                      {
                        id: "semis-46-26",
                        name: "引线键合设备"
                      },
                      {
                        id: "semis-46-27",
                        name: "热压键合与混合键合设备"
                      }
                    ]
                  },
                  {
                    id: "semis-46-28",
                    name: "成型与封装成形装备",
                    children: [
                      {
                        id: "semis-46-29",
                        name: "塑封与压缩模塑设备"
                      },
                      {
                        id: "semis-46-30",
                        name: "底部填充与封胶设备"
                      },
                      {
                        id: "semis-46-31",
                        name: "植球焊接连接设备"
                      },
                      {
                        id: "semis-46-32",
                        name: "基板贴合与封装组装设备"
                      }
                    ]
                  },
                  {
                    id: "semis-46-33",
                    name: "分离与后整理装备",
                    children: [
                      {
                        id: "semis-46-34",
                        name: "划片与分割设备"
                      },
                      {
                        id: "semis-46-35",
                        name: "切筋成形设备"
                      },
                      {
                        id: "semis-46-36",
                        name: "去毛刺打标清洗设备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-46-37",
                name: "测试分选与质量保障装备",
                children: [
                  {
                    id: "semis-46-38",
                    name: "晶圆级测试装备",
                    children: [
                      {
                        id: "semis-46-39",
                        name: "探针台"
                      },
                      {
                        id: "semis-46-40",
                        name: "晶圆测试机"
                      },
                      {
                        id: "semis-46-41",
                        name: "晶圆AOI与量测设备"
                      }
                    ]
                  },
                  {
                    id: "semis-46-42",
                    name: "封装后测试装备",
                    children: [
                      {
                        id: "semis-46-43",
                        name: "分立器件测试机"
                      },
                      {
                        id: "semis-46-44",
                        name: "SoC存储射频测试机"
                      },
                      {
                        id: "semis-46-45",
                        name: "功率器件与模拟混合信号测试机"
                      }
                    ]
                  },
                  {
                    id: "semis-46-46",
                    name: "老化筛选与分选搬运装备",
                    children: [
                      {
                        id: "semis-46-47",
                        name: "Burn-in系统"
                      },
                      {
                        id: "semis-46-48",
                        name: "Handler与分选机"
                      },
                      {
                        id: "semis-46-49",
                        name: "编带包装设备"
                      }
                    ]
                  },
                  {
                    id: "semis-46-50",
                    name: "缺陷分析与可靠性验证装备",
                    children: [
                      {
                        id: "semis-46-51",
                        name: "AOI与外观检测设备"
                      },
                      {
                        id: "semis-46-52",
                        name: "X-Ray CT与超声扫描设备"
                      },
                      {
                        id: "semis-46-53",
                        name: "电性失效分析与可靠性试验设备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-46-54",
                name: "应用场景与产业生态",
                children: [
                  {
                    id: "semis-46-55",
                    name: "终端客户结构",
                    children: [
                      {
                        id: "semis-46-56",
                        name: "OSAT封测厂"
                      },
                      {
                        id: "semis-46-57",
                        name: "IDM后道制造"
                      },
                      {
                        id: "semis-46-58",
                        name: "Foundry先进封装产线"
                      }
                    ]
                  },
                  {
                    id: "semis-46-59",
                    name: "重点需求场景",
                    children: [
                      {
                        id: "semis-46-60",
                        name: "AI与HPC先进封装"
                      },
                      {
                        id: "semis-46-61",
                        name: "HBM与2.5D 3D集成"
                      },
                      {
                        id: "semis-46-62",
                        name: "汽车电子与功率半导体封测"
                      },
                      {
                        id: "semis-46-63",
                        name: "消费电子与射频模组封测"
                      }
                    ]
                  },
                  {
                    id: "semis-46-64",
                    name: "配套与服务体系",
                    children: [
                      {
                        id: "semis-46-65",
                        name: "设备维保与工艺服务"
                      },
                      {
                        id: "semis-46-66",
                        name: "产线自动化与MES EAP集成"
                      },
                      {
                        id: "semis-46-67",
                        name: "标准认证与供应链协同"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "semis-47",
            name: "半导体材料",
            children: [
              {
                id: "semis-47-1",
                name: "关键资源与基础材料",
                children: [
                  {
                    id: "semis-47-2",
                    name: "衬底与基材",
                    children: [
                      {
                        id: "semis-47-3",
                        name: "300mm 硅片"
                      },
                      {
                        id: "semis-47-4",
                        name: "200mm 硅片"
                      },
                      {
                        id: "semis-47-5",
                        name: "SOI 硅片"
                      },
                      {
                        id: "semis-47-6",
                        name: "外延片"
                      },
                      {
                        id: "semis-47-7",
                        name: "绝缘基板与陶瓷基板"
                      },
                      {
                        id: "semis-47-8",
                        name: "蓝宝石与玻璃基板"
                      }
                    ]
                  },
                  {
                    id: "semis-47-9",
                    name: "化合物半导体材料",
                    children: [
                      {
                        id: "semis-47-10",
                        name: "碳化硅衬底与外延"
                      },
                      {
                        id: "semis-47-11",
                        name: "氮化镓衬底与外延"
                      },
                      {
                        id: "semis-47-12",
                        name: "砷化镓衬底与外延"
                      },
                      {
                        id: "semis-47-13",
                        name: "磷化铟衬底与外延"
                      },
                      {
                        id: "semis-47-14",
                        name: "氧化镓与金刚石等前沿材料"
                      }
                    ]
                  },
                  {
                    id: "semis-47-15",
                    name: "上游原料与前驱体",
                    children: [
                      {
                        id: "semis-47-16",
                        name: "高纯多晶硅"
                      },
                      {
                        id: "semis-47-17",
                        name: "工业硅与石英材料"
                      },
                      {
                        id: "semis-47-18",
                        name: "稀散金属与高纯金属"
                      },
                      {
                        id: "semis-47-19",
                        name: "特种单体与聚合物原料"
                      },
                      {
                        id: "semis-47-20",
                        name: "高纯溶剂与添加剂"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-47-21",
                name: "制造材料与过程介质",
                children: [
                  {
                    id: "semis-47-22",
                    name: "光刻与图形化材料",
                    children: [
                      {
                        id: "semis-47-23",
                        name: "光刻胶"
                      },
                      {
                        id: "semis-47-24",
                        name: "底部抗反射涂层"
                      },
                      {
                        id: "semis-47-25",
                        name: "顶部抗反射涂层"
                      },
                      {
                        id: "semis-47-26",
                        name: "显影液与配套辅材"
                      },
                      {
                        id: "semis-47-27",
                        name: "光掩模与掩模保护膜"
                      }
                    ]
                  },
                  {
                    id: "semis-47-28",
                    name: "薄膜沉积与刻蚀材料",
                    children: [
                      {
                        id: "semis-47-29",
                        name: "电子特气"
                      },
                      {
                        id: "semis-47-30",
                        name: "湿电子化学品"
                      },
                      {
                        id: "semis-47-31",
                        name: "PVD 靶材"
                      },
                      {
                        id: "semis-47-32",
                        name: "CVD ALD 前驱体"
                      },
                      {
                        id: "semis-47-33",
                        name: "刻蚀气体与清洗气体"
                      }
                    ]
                  },
                  {
                    id: "semis-47-34",
                    name: "平坦化与表面处理材料",
                    children: [
                      {
                        id: "semis-47-35",
                        name: "CMP 抛光液"
                      },
                      {
                        id: "semis-47-36",
                        name: "CMP 抛光垫"
                      },
                      {
                        id: "semis-47-37",
                        name: "清洗液"
                      },
                      {
                        id: "semis-47-38",
                        name: "剥离液"
                      },
                      {
                        id: "semis-47-39",
                        name: "电镀液与表面处理药液"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-47-40",
                name: "封装材料与先进集成",
                children: [
                  {
                    id: "semis-47-41",
                    name: "传统封装材料",
                    children: [
                      {
                        id: "semis-47-42",
                        name: "引线框架"
                      },
                      {
                        id: "semis-47-43",
                        name: "键合丝"
                      },
                      {
                        id: "semis-47-44",
                        name: "模塑料"
                      },
                      {
                        id: "semis-47-45",
                        name: "银胶与绝缘胶"
                      },
                      {
                        id: "semis-47-46",
                        name: "陶瓷封装材料"
                      }
                    ]
                  },
                  {
                    id: "semis-47-47",
                    name: "先进封装材料",
                    children: [
                      {
                        id: "semis-47-48",
                        name: "封装基板"
                      },
                      {
                        id: "semis-47-49",
                        name: "积层介质与 ABF 载板材料"
                      },
                      {
                        id: "semis-47-50",
                        name: "凸点与焊球材料"
                      },
                      {
                        id: "semis-47-51",
                        name: "底部填充材料"
                      },
                      {
                        id: "semis-47-52",
                        name: "临时键合与解键合材料"
                      },
                      {
                        id: "semis-47-53",
                        name: "热界面材料"
                      }
                    ]
                  },
                  {
                    id: "semis-47-54",
                    name: "晶圆级与三维集成配套材料",
                    children: [
                      {
                        id: "semis-47-55",
                        name: "重布线介质材料"
                      },
                      {
                        id: "semis-47-56",
                        name: "光敏聚酰亚胺与感光介质"
                      },
                      {
                        id: "semis-47-57",
                        name: "硅通孔填充材料"
                      },
                      {
                        id: "semis-47-58",
                        name: "混合键合相关材料"
                      },
                      {
                        id: "semis-47-59",
                        name: "Chiplet 互连材料"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-47-60",
                name: "支撑体系与循环保障",
                children: [
                  {
                    id: "semis-47-61",
                    name: "检测认证与洁净保障",
                    children: [
                      {
                        id: "semis-47-62",
                        name: "超纯水与超纯化学品配送"
                      },
                      {
                        id: "semis-47-63",
                        name: "洁净耗材与过滤材料"
                      },
                      {
                        id: "semis-47-64",
                        name: "材料检测与表征"
                      },
                      {
                        id: "semis-47-65",
                        name: "缺陷分析与失效分析配套材料"
                      }
                    ]
                  },
                  {
                    id: "semis-47-66",
                    name: "供应链与制造保障",
                    children: [
                      {
                        id: "semis-47-67",
                        name: "包装与储运材料"
                      },
                      {
                        id: "semis-47-68",
                        name: "设备配套消耗品"
                      },
                      {
                        id: "semis-47-69",
                        name: "国产替代验证体系"
                      },
                      {
                        id: "semis-47-70",
                        name: "安全环保与合规保障"
                      }
                    ]
                  },
                  {
                    id: "semis-47-71",
                    name: "回收再生与循环利用",
                    children: [
                      {
                        id: "semis-47-72",
                        name: "硅片再生"
                      },
                      {
                        id: "semis-47-73",
                        name: "贵金属回收"
                      },
                      {
                        id: "semis-47-74",
                        name: "溶剂回收"
                      },
                      {
                        id: "semis-47-75",
                        name: "酸碱废液处理"
                      },
                      {
                        id: "semis-47-76",
                        name: "含氟含氯尾气治理材料"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "semis-48",
            name: "先进封装材料",
            children: [
              {
                id: "semis-48-1",
                name: "关键基材与载体",
                children: [
                  {
                    id: "semis-48-2",
                    name: "封装基板",
                    children: [
                      {
                        id: "semis-48-3",
                        name: "ABF载板"
                      },
                      {
                        id: "semis-48-4",
                        name: "BT载板"
                      },
                      {
                        id: "semis-48-5",
                        name: "玻璃芯与玻璃基板"
                      },
                      {
                        id: "semis-48-6",
                        name: "陶瓷基板"
                      }
                    ]
                  },
                  {
                    id: "semis-48-7",
                    name: "中介层与重布线载体",
                    children: [
                      {
                        id: "semis-48-8",
                        name: "硅中介层"
                      },
                      {
                        id: "semis-48-9",
                        name: "RDL中介层与有机中介层"
                      },
                      {
                        id: "semis-48-10",
                        name: "硅桥与嵌桥载体"
                      },
                      {
                        id: "semis-48-11",
                        name: "临时载板与玻璃载板"
                      }
                    ]
                  },
                  {
                    id: "semis-48-12",
                    name: "导电互连基础材料",
                    children: [
                      {
                        id: "semis-48-13",
                        name: "铜箔与铜电镀材料"
                      },
                      {
                        id: "semis-48-14",
                        name: "种子层与阻挡层"
                      },
                      {
                        id: "semis-48-15",
                        name: "焊球与焊料合金"
                      },
                      {
                        id: "semis-48-16",
                        name: "铜柱与微凸点材料"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-48-17",
                name: "功能材料与工艺辅材",
                children: [
                  {
                    id: "semis-48-18",
                    name: "介电与绝缘材料",
                    children: [
                      {
                        id: "semis-48-19",
                        name: "PI/PBO/环氧介电材料"
                      },
                      {
                        id: "semis-48-20",
                        name: "感光介电材料"
                      },
                      {
                        id: "semis-48-21",
                        name: "钝化与绝缘膜材料"
                      }
                    ]
                  },
                  {
                    id: "semis-48-22",
                    name: "键合、贴装与填充材料",
                    children: [
                      {
                        id: "semis-48-23",
                        name: "芯片粘接与DAF材料"
                      },
                      {
                        id: "semis-48-24",
                        name: "NCF/NCP材料"
                      },
                      {
                        id: "semis-48-25",
                        name: "混合键合介质与前处理材料"
                      },
                      {
                        id: "semis-48-26",
                        name: "底填材料"
                      }
                    ]
                  },
                  {
                    id: "semis-48-27",
                    name: "封装成型与保护材料",
                    children: [
                      {
                        id: "semis-48-28",
                        name: "EMC塑封料"
                      },
                      {
                        id: "semis-48-29",
                        name: "液态包封材料"
                      },
                      {
                        id: "semis-48-30",
                        name: "边缘封胶与加固材料"
                      },
                      {
                        id: "semis-48-31",
                        name: "防潮防离子污染保护材料"
                      }
                    ]
                  },
                  {
                    id: "semis-48-32",
                    name: "制程化学品与辅助材料",
                    children: [
                      {
                        id: "semis-48-33",
                        name: "临时键合胶与解键合材料"
                      },
                      {
                        id: "semis-48-34",
                        name: "电镀药水与表面处理化学品"
                      },
                      {
                        id: "semis-48-35",
                        name: "清洗去胶化学品"
                      },
                      {
                        id: "semis-48-36",
                        name: "研磨切割与载片耗材"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-48-37",
                name: "热管理与可靠性材料",
                children: [
                  {
                    id: "semis-48-38",
                    name: "导热与散热材料",
                    children: [
                      {
                        id: "semis-48-39",
                        name: "热界面材料"
                      },
                      {
                        id: "semis-48-40",
                        name: "导热胶与银烧结材料"
                      },
                      {
                        id: "semis-48-41",
                        name: "热扩散盖板材料"
                      },
                      {
                        id: "semis-48-42",
                        name: "均热与导热复合材料"
                      }
                    ]
                  },
                  {
                    id: "semis-48-43",
                    name: "机械与结构可靠性材料",
                    children: [
                      {
                        id: "semis-48-44",
                        name: "低CTE填料体系"
                      },
                      {
                        id: "semis-48-45",
                        name: "缓冲与应力释放材料"
                      },
                      {
                        id: "semis-48-46",
                        name: "翘曲控制材料"
                      },
                      {
                        id: "semis-48-47",
                        name: "结构补强材料"
                      }
                    ]
                  },
                  {
                    id: "semis-48-48",
                    name: "分析与保护辅材",
                    children: [
                      {
                        id: "semis-48-49",
                        name: "制样切片抛光耗材"
                      },
                      {
                        id: "semis-48-50",
                        name: "防静电与洁净包装材料"
                      },
                      {
                        id: "semis-48-51",
                        name: "标记追溯材料"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-48-52",
                name: "应用牵引与产业协同",
                children: [
                  {
                    id: "semis-48-53",
                    name: "核心封装路线",
                    children: [
                      {
                        id: "semis-48-54",
                        name: "FOWLP/FOPLP材料体系"
                      },
                      {
                        id: "semis-48-55",
                        name: "2.5D与CoWoS材料体系"
                      },
                      {
                        id: "semis-48-56",
                        name: "3D堆叠与Hybrid Bonding材料体系"
                      },
                      {
                        id: "semis-48-57",
                        name: "SiP、AiP与Chiplet材料体系"
                      }
                    ]
                  },
                  {
                    id: "semis-48-58",
                    name: "重点需求场景",
                    children: [
                      {
                        id: "semis-48-59",
                        name: "AI与HPC"
                      },
                      {
                        id: "semis-48-60",
                        name: "HBM与高速互连"
                      },
                      {
                        id: "semis-48-61",
                        name: "智能终端与可穿戴"
                      },
                      {
                        id: "semis-48-62",
                        name: "汽车电子与高可靠"
                      }
                    ]
                  },
                  {
                    id: "semis-48-63",
                    name: "产业协同主体",
                    children: [
                      {
                        id: "semis-48-64",
                        name: "材料供应商"
                      },
                      {
                        id: "semis-48-65",
                        name: "基板与中介层制造商"
                      },
                      {
                        id: "semis-48-66",
                        name: "Foundry与OSAT"
                      },
                      {
                        id: "semis-48-67",
                        name: "仿真验证与认证平台"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    midstream: {
      label: "中游",
      root: {
        id: "semis-midstream",
        name: "半导体",
        children: [
          {
            id: "semis-49",
            name: "AI算力芯片",
            children: [
              {
                id: "semis-49-1",
                name: "设计与技术底座",
                children: [
                  {
                    id: "semis-49-2",
                    name: "芯片架构与产品路线",
                    children: [
                      {
                        id: "semis-49-3",
                        name: "训练加速器"
                      },
                      {
                        id: "semis-49-4",
                        name: "推理加速器"
                      },
                      {
                        id: "semis-49-5",
                        name: "通用计算 CPU"
                      },
                      {
                        id: "semis-49-6",
                        name: "DPU 与 SmartNIC"
                      },
                      {
                        id: "semis-49-7",
                        name: "交换与互连芯片"
                      }
                    ]
                  },
                  {
                    id: "semis-49-8",
                    name: "开发工具与基础 IP",
                    children: [
                      {
                        id: "semis-49-9",
                        name: "EDA 工具"
                      },
                      {
                        id: "semis-49-10",
                        name: "CPU GPU NPU DSP IP"
                      },
                      {
                        id: "semis-49-11",
                        name: "SerDes PCIe CXL HBM PHY IP"
                      },
                      {
                        id: "semis-49-12",
                        name: "编译器与运行时工具链"
                      }
                    ]
                  },
                  {
                    id: "semis-49-13",
                    name: "算法硬件协同",
                    children: [
                      {
                        id: "semis-49-14",
                        name: "并行计算架构"
                      },
                      {
                        id: "semis-49-15",
                        name: "存储层级优化"
                      },
                      {
                        id: "semis-49-16",
                        name: "低精度与稀疏化计算"
                      },
                      {
                        id: "semis-49-17",
                        name: "Chiplet 与异构集成规划"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-49-18",
                name: "制造与供应体系",
                children: [
                  {
                    id: "semis-49-19",
                    name: "前道材料与制造要素",
                    children: [
                      {
                        id: "semis-49-20",
                        name: "硅片与外延材料"
                      },
                      {
                        id: "semis-49-21",
                        name: "光刻胶与掩模版"
                      },
                      {
                        id: "semis-49-22",
                        name: "电子特气与湿电子化学品"
                      },
                      {
                        id: "semis-49-23",
                        name: "靶材与抛光材料"
                      }
                    ]
                  },
                  {
                    id: "semis-49-24",
                    name: "晶圆制造",
                    children: [
                      {
                        id: "semis-49-25",
                        name: "先进逻辑代工"
                      },
                      {
                        id: "semis-49-26",
                        name: "HBM 与高端 DRAM 制造"
                      },
                      {
                        id: "semis-49-27",
                        name: "晶圆级互连与 TSV"
                      },
                      {
                        id: "semis-49-28",
                        name: "良率控制与工艺整合"
                      }
                    ]
                  },
                  {
                    id: "semis-49-29",
                    name: "后道封装与测试",
                    children: [
                      {
                        id: "semis-49-30",
                        name: "CoWoS SoIC 2.5D 3D 封装"
                      },
                      {
                        id: "semis-49-31",
                        name: "封装基板与载板"
                      },
                      {
                        id: "semis-49-32",
                        name: "OSAT 与先进封测"
                      },
                      {
                        id: "semis-49-33",
                        name: "老化测试与可靠性验证"
                      }
                    ]
                  },
                  {
                    id: "semis-49-34",
                    name: "装备与工业软件",
                    children: [
                      {
                        id: "semis-49-35",
                        name: "光刻刻蚀薄膜清洗设备"
                      },
                      {
                        id: "semis-49-36",
                        name: "检测量测与缺陷分析设备"
                      },
                      {
                        id: "semis-49-37",
                        name: "封装贴装键合测试设备"
                      },
                      {
                        id: "semis-49-38",
                        name: "制造执行与工艺控制软件"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-49-39",
                name: "产品交付与系统集成",
                children: [
                  {
                    id: "semis-49-40",
                    name: "芯片与模组",
                    children: [
                      {
                        id: "semis-49-41",
                        name: "加速器裸片与多芯粒模组"
                      },
                      {
                        id: "semis-49-42",
                        name: "HBM 近封装模组"
                      },
                      {
                        id: "semis-49-43",
                        name: "OAM SXM PCIe 加速卡"
                      },
                      {
                        id: "semis-49-44",
                        name: "参考设计与开发板"
                      }
                    ]
                  },
                  {
                    id: "semis-49-45",
                    name: "板级与整机系统",
                    children: [
                      {
                        id: "semis-49-46",
                        name: "AI 服务器主板与背板"
                      },
                      {
                        id: "semis-49-47",
                        name: "CPU GPU DPU 协同系统"
                      },
                      {
                        id: "semis-49-48",
                        name: "高速交换与光互连系统"
                      },
                      {
                        id: "semis-49-49",
                        name: "电源与液冷散热系统"
                      }
                    ]
                  },
                  {
                    id: "semis-49-50",
                    name: "集群与平台交付",
                    children: [
                      {
                        id: "semis-49-51",
                        name: "机柜级算力单元"
                      },
                      {
                        id: "semis-49-52",
                        name: "集群网络与调度平台"
                      },
                      {
                        id: "semis-49-53",
                        name: "模型训练平台"
                      },
                      {
                        id: "semis-49-54",
                        name: "推理服务平台"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-49-55",
                name: "应用场景与产业生态",
                children: [
                  {
                    id: "semis-49-56",
                    name: "需求侧主体",
                    children: [
                      {
                        id: "semis-49-57",
                        name: "云厂商与超大规模数据中心"
                      },
                      {
                        id: "semis-49-58",
                        name: "IDC 与算力服务商"
                      },
                      {
                        id: "semis-49-59",
                        name: "行业私有化算力中心"
                      },
                      {
                        id: "semis-49-60",
                        name: "边缘智能基础设施"
                      }
                    ]
                  },
                  {
                    id: "semis-49-61",
                    name: "重点应用方向",
                    children: [
                      {
                        id: "semis-49-62",
                        name: "大模型训练"
                      },
                      {
                        id: "semis-49-63",
                        name: "大模型推理"
                      },
                      {
                        id: "semis-49-64",
                        name: "科学计算与仿真"
                      },
                      {
                        id: "semis-49-65",
                        name: "自动驾驶与具身智能"
                      }
                    ]
                  },
                  {
                    id: "semis-49-66",
                    name: "产业协同与规范",
                    children: [
                      {
                        id: "semis-49-67",
                        name: "UCIe CXL OCP 等开放生态"
                      },
                      {
                        id: "semis-49-68",
                        name: "供应链安全与合规"
                      },
                      {
                        id: "semis-49-69",
                        name: "产能协同与联合开发"
                      },
                      {
                        id: "semis-49-70",
                        name: "资本开支与采购体系"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "semis-50",
            name: "功率半导体",
            children: [
              {
                id: "semis-50-1",
                name: "关键材料与装备体系",
                children: [
                  {
                    id: "semis-50-2",
                    name: "材料体系",
                    children: [
                      {
                        id: "semis-50-3",
                        name: "硅衬底与外延片"
                      },
                      {
                        id: "semis-50-4",
                        name: "碳化硅衬底与外延片"
                      },
                      {
                        id: "semis-50-5",
                        name: "氮化镓外延材料体系"
                      },
                      {
                        id: "semis-50-6",
                        name: "封装基板与热管理材料"
                      },
                      {
                        id: "semis-50-7",
                        name: "光刻胶与电子特气"
                      }
                    ]
                  },
                  {
                    id: "semis-50-8",
                    name: "专用设备",
                    children: [
                      {
                        id: "semis-50-9",
                        name: "晶体生长与衬底加工设备"
                      },
                      {
                        id: "semis-50-10",
                        name: "外延生长设备"
                      },
                      {
                        id: "semis-50-11",
                        name: "薄膜沉积与光刻设备"
                      },
                      {
                        id: "semis-50-12",
                        name: "刻蚀离子注入与退火设备"
                      },
                      {
                        id: "semis-50-13",
                        name: "划片贴片键合与塑封设备"
                      },
                      {
                        id: "semis-50-14",
                        name: "电参数与可靠性测试设备"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-50-15",
                name: "制造与封测工程",
                children: [
                  {
                    id: "semis-50-16",
                    name: "芯片设计与晶圆制造",
                    children: [
                      {
                        id: "semis-50-17",
                        name: "功率器件结构设计"
                      },
                      {
                        id: "semis-50-18",
                        name: "晶圆前道制造"
                      },
                      {
                        id: "semis-50-19",
                        name: "宽禁带专用产线"
                      }
                    ]
                  },
                  {
                    id: "semis-50-20",
                    name: "封装与模块集成",
                    children: [
                      {
                        id: "semis-50-21",
                        name: "分立器件封装"
                      },
                      {
                        id: "semis-50-22",
                        name: "功率模块与智能功率模块"
                      },
                      {
                        id: "semis-50-23",
                        name: "散热绝缘与互连结构"
                      }
                    ]
                  },
                  {
                    id: "semis-50-24",
                    name: "测试验证与质量体系",
                    children: [
                      {
                        id: "semis-50-25",
                        name: "晶圆测试与成品测试"
                      },
                      {
                        id: "semis-50-26",
                        name: "车规与工业级可靠性验证"
                      },
                      {
                        id: "semis-50-27",
                        name: "失效分析与过程控制"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-50-28",
                name: "产品谱系与关键技术",
                children: [
                  {
                    id: "semis-50-29",
                    name: "硅基功率器件",
                    children: [
                      {
                        id: "semis-50-30",
                        name: "功率二极管与整流器"
                      },
                      {
                        id: "semis-50-31",
                        name: "平面与沟槽 MOSFET"
                      },
                      {
                        id: "semis-50-32",
                        name: "超结 MOSFET"
                      },
                      {
                        id: "semis-50-33",
                        name: "IGBT 与配套二极管"
                      }
                    ]
                  },
                  {
                    id: "semis-50-34",
                    name: "宽禁带功率器件",
                    children: [
                      {
                        id: "semis-50-35",
                        name: "SiC SBD 与 JBS 器件"
                      },
                      {
                        id: "semis-50-36",
                        name: "SiC MOSFET"
                      },
                      {
                        id: "semis-50-37",
                        name: "GaN HEMT 与集成功率级"
                      }
                    ]
                  },
                  {
                    id: "semis-50-38",
                    name: "产品形态",
                    children: [
                      {
                        id: "semis-50-39",
                        name: "分立器件"
                      },
                      {
                        id: "semis-50-40",
                        name: "裸芯片与功率裸片"
                      },
                      {
                        id: "semis-50-41",
                        name: "功率模块"
                      },
                      {
                        id: "semis-50-42",
                        name: "智能功率模块"
                      }
                    ]
                  },
                  {
                    id: "semis-50-43",
                    name: "配套驱控与保护",
                    children: [
                      {
                        id: "semis-50-44",
                        name: "栅极驱动与隔离"
                      },
                      {
                        id: "semis-50-45",
                        name: "电流电压温度检测"
                      },
                      {
                        id: "semis-50-46",
                        name: "保护与控制接口"
                      }
                    ]
                  }
                ]
              },
              {
                id: "semis-50-47",
                name: "应用场景与产业生态",
                children: [
                  {
                    id: "semis-50-48",
                    name: "汽车电动化",
                    children: [
                      {
                        id: "semis-50-49",
                        name: "牵引逆变器"
                      },
                      {
                        id: "semis-50-50",
                        name: "车载充电机与 DC DC"
                      },
                      {
                        id: "semis-50-51",
                        name: "电驱辅逆与热管理"
                      },
                      {
                        id: "semis-50-52",
                        name: "车外快充设备"
                      }
                    ]
                  },
                  {
                    id: "semis-50-53",
                    name: "能源与电力电子",
                    children: [
                      {
                        id: "semis-50-54",
                        name: "光伏逆变器"
                      },
                      {
                        id: "semis-50-55",
                        name: "储能变流器"
                      },
                      {
                        id: "semis-50-56",
                        name: "充电桩与直流配电"
                      },
                      {
                        id: "semis-50-57",
                        name: "电网与轨交电力转换"
                      }
                    ]
                  },
                  {
                    id: "semis-50-58",
                    name: "工业与基础设施",
                    children: [
                      {
                        id: "semis-50-59",
                        name: "变频器与伺服驱动"
                      },
                      {
                        id: "semis-50-60",
                        name: "工业电源与 UPS"
                      },
                      {
                        id: "semis-50-61",
                        name: "机器人与自动化设备"
                      },
                      {
                        id: "semis-50-62",
                        name: "数据中心与通信电源"
                      }
                    ]
                  },
                  {
                    id: "semis-50-63",
                    name: "消费与新兴终端",
                    children: [
                      {
                        id: "semis-50-64",
                        name: "快充适配器"
                      },
                      {
                        id: "semis-50-65",
                        name: "家电与白色家电逆变"
                      },
                      {
                        id: "semis-50-66",
                        name: "低空与轻型电动交通"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
}
