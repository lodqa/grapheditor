export default `
{{#if texts}}
<table>
  <tbody>
    {{#texts}}
    <tr data-id="{{id}}" data-source-id="{{sourceId}}" data-target-id="{{targetId}}" data-index={{@index}} class="{{#if selected}}selected{{/if}} {{#if hover}}hover{{/if}}">
      <td class="focus">
      </td>
      <td class="text">
        <input value="{{text}}">
        <button class="find-term-button find-term" title="find term"><i class="fa fa-search"></i></button>
        <button class="delete-button" title="delete"><i class="fa fa-trash-o"></i></button>
      </td>
      <td class="terms">
          {{#terms}}
          <div data-index={{@index}} class="term {{#if id==hover_term.text && @index==hover_term.index}}hover{{/if}}">
            <input type="checkbox" checked="{{enable}}">
            <input class="term" value="{{value}}">
            <button class="delete-button" title="delete"><i class="fa fa-trash-o"></i></button>
          </div>
          {{/terms}}
          <div class="add">
            <input type="checkbox">
            <input class="term">
            <button class="add-button" title="add"><i class="fa fa-plus"></i></button>
          </div>
      </td>
    </tr>
    {{/texts}}
  </tbody>
</table>
{{/if}}`
