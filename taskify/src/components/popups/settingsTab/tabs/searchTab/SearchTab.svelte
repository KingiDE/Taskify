<script lang="ts">
import OperatorTable from "./OperatorTable.svelte";
</script>

<div class="grid gap-2 pr-1.5">
  <div>
    All prebuilt fields need to be used in their lowercase form. For example, to
    filter all tasks for done equals true, you need to input
    <span
      class="py-1 px-3 text-sm rounded-md -outline-offset-1 bg-gray-700 outline-1 outline-gray-500"
      >done==true</span
    > although this field is called "Done" everywhere.
  </div>
  <div class="relative px-3">
    <div class="opacity-50">
      Note that this rule doesn't apply to your own custom fields.
    </div>
    <div
      class="absolute h-full w-1 bg-purple-600 top-0 left-0 rounded-md"
    ></div>
  </div>
  <div class="mt-2">
    If you have any fields or values with spaces, wrap them in double quotes for
    the filter to properly work.
  </div>
  <div class="relative px-3">
    <div class="opacity-50">
      The use of double quotes inside of field names is generally disadvised
      because they can break filter queries.
    </div>
    <div class="absolute h-full w-1 bg-red-500 top-0 left-0 rounded-md"></div>
  </div>
  <table class="mt-2">
    <thead>
      <tr>
        <th class="pb-2 w-[88px]">Operator</th>
        <th class="pb-2 w-[220px]">Description</th>
        <th class="pb-2">Can be used in:</th>
      </tr>
    </thead>
    <tbody>
      <OperatorTable
        operator="=="
        description="The task's value must exactly equal the filter-value."
        useBlocks={[
          "Title, Description",
          "Done, Difficulty, Size",
          "Relations",
        ]}
      />
      <OperatorTable
        operator="!="
        description="The task's value mustn't exactly equal the filter-value."
        useBlocks={[
          "Title, Description",
          "Done, Difficulty, Size",
          "Relations",
        ]}
      />
      <OperatorTable
        operator="=*"
        description="The task's value must include the filter-value."
        useBlocks={["Title, Description"]}
      />
      <OperatorTable
        operator="!*"
        description="The task's value mustn't include the filter-value."
        useBlocks={["Title, Description"]}
      />
      <OperatorTable
        operator="=<"
        description="The task's value must be lower than the filter-value."
        useBlocks={["Relations"]}
      />
      <OperatorTable
        operator="=>"
        description="The task's value must be greater than the filter-value."
        useBlocks={["Relations"]}
      />
      <OperatorTable
        operator="!<"
        description="The task's value mustn't be lower than the filter-value."
        useBlocks={["Relations"]}
      />
      <OperatorTable
        operator="!>"
        description="The task's value mustn't be greater than the filter-value."
        useBlocks={["Relations"]}
        noPaddingBottom={true}
      />
    </tbody>
  </table>
  <div class="mt-2 font-medium">Custom fields:</div>
  <div>
    Additionally you can use your own custom fields as filters and pair them
    with appropiate operators. For example, when you have an custom field called <span
      class="py-1 px-3 text-sm rounded-md -outline-offset-1 bg-gray-700 outline-1 outline-gray-500"
      >views</span
    >
    of the type number, you can filter for all tasks that have e.g. less than 100
    views by using
    <span
      class="py-1 px-3 text-sm rounded-md -outline-offset-1 bg-gray-700 outline-1 outline-gray-500"
      >views={"<"}100</span
    >.
  </div>
</div>
