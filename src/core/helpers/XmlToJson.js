import xml2json from 'simple-xml2json';
export default class XmlToJson {

  constructor() {

  }

  parse(xml) {
    return xml2json.parser(xml);
  }


};
