import handlebars from 'handlebars';
import fs from 'fs'
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';




class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file)
    const parseTemplate = handlebars.compile(templateFileContent.toString());

    return parseTemplate(variables);
  }
}
 

export default HandlebarsMailTemplateProvider;


