export const reorder = async (items: any[], model: any) => {
  return new Promise((resolve, reject) => {
    let promisses = [];

    items.forEach((item) => {
      promisses.push(
        model.findByIdAndUpdate(item._id, { order: item.order }, { new: true })
      );
    });

    Promise.all(promisses)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
