export default {
  namespaced: true,
  // 重要信息：state 必须是一个函数，
  // 因此可以创建多个实例化该模块
  state: () => ({
    count: 0,
  }),
  actions: {
    inc: ({ commit }: any) => commit("inc"),
  },
  mutations: {
    inc: (state: any) => state.count++,
  },
};
