export class NovelService {
  static async getAll() {
    let list = [];
    await fetch("https://tienthanh217.000webhostapp.com/Api/getListNovel.php")
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function(responseAsJson) {
        list = responseAsJson;
      })
      .catch(function(error) {
        console.log("Looks like there was a problem: \n", error);
      });    
      return list
  }
}
