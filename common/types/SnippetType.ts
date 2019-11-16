export default interface SnippetType {
    uuid: string,
    editorMode: string,
    date: Date,
    dateSearch: string,
    description: string,
    content: string, //Good for now, but file is recommended.
}