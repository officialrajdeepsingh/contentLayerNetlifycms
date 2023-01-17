import { defineDocumentType, makeSource} from "contentlayer/source-files";


const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `**/*.md`,
    contentType: 'markdown',
    fields: {
      title: {
        type: 'string',
        required: true,
      },
      date: {
        type: 'date',
        required: true,
      },
      author:{
        type: 'string',
        required: true,
      },
     
      description:{
        type: 'string',
        required: true,
      },
      slug:{
        type: 'string',
      },
      id:{
        type: 'number',
        required: false,
      },
      image:{
        type: 'string',
      },
      draft:{
        type: 'boolean',
        required: true,
      },
      tags: {
        type: 'list',
        of: { type: 'string' }
      },
      categories:{
        type: 'list',
        of: { type: 'string' },
      }

    },
    computedFields: {
      slug: {
        type: "string",
        resolve: (doc) => doc._raw.sourceFileName.replace(/\.md/, ""),
      },
    }
  
}))
  
export default makeSource({
    contentDirPath: 'posts',
    documentTypes: [Post],
})