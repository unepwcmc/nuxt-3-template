// Example Of how to use <FormKitSchema>
export function goodGovernance() {
	return {
		$el: "ul",
		children: [
			{
				$el: "li",
				children: [
					{
						$el: "span",
						attrs: {
							class: "utilities-form-pame-assessment__component-title"
						},
						children: "Equitable & appropriate governance including all key actorsfdsf"
					},
					{
						$el: "h3",
						children: "Key Questions"
					},
					{
						$el: "ul",
						children: [
							{
								$el: "li",
								children: "Have stakeholders/rightsholders been identified & engaged?"
							},
							{
								$el: "li",
								children: "Cooperation / management agreements between governmental agencies?"
							}
						]
					},
					{
						$el: "h2",
						children: "Please use the answers you have given from your METT form to assessment your progress. See below for the related questions to help you determin your progress"
					},
					{
						$el: "ul",
						children: [
							{
								$el: "li",
								children: "7a xxxxxxxx"
							},
							{
								$el: "li",
								children: "7c xxxxxxxx"
							}
						]
					},
					{
						$cmp: "FormKit",
						props: {
							type: "radio",
							label: "Rating",
							help: "Select your rating",
							options: [
								{ value: "Achieved", label: "Achieved" },
								{ value: "On Track", label: "On Track" },
								{ value: "Partially Achieved", label: "Partially Achieved" }
							],
							validation: "required"
						}
					},
					{
						$cmp: "FormKit",
						props: {
							type: "select",
							label: "Rating",
							help: "Select your rating",
							options: [
								{ value: "Achieved", label: "Achieved" },
								{ value: "On Track", label: "On Track" },
								{ value: "Partially Achieved", label: "Partially Achieved" }
							]
						}
					},
					{
						$cmp: "FormKit",
						props: {
							type: "select",
							label: "Confidence",
							help: "Select how confident you are for the rating chosen",
							options: [
								{ value: "scorecard", label: "Scorecard" },
								{ value: "quantitative_assessment", label: "Quantitative assessment" },
								{ value: "expert_opinion", label: "Expert opinion" }
							]
						}
					}
				]
			}
		]
	}
}

export const mettExample = {
	assessment_type: "METT",
	form_components:
  [
  	{
  		component_id: 1,
  		component_name: "Good Governance",
  		component_results:
           [
           	{
           		result_id: 1,
           		result_name: "Equitable & appropriate governance including all key actors",
           		result_key_questions:
                  [
                  	"Have stakeholders/rightsholders been identified & engaged?",
                  	"Cooperation / management agreements between governmental agencies?",
                  	"Does the governance structure recognize rights for all relevant stakeholders/rightsholders? (including for example gender considerations, youth, indigenous, local communitites, commercial entities, landowners)"
                  ],

           		result_relevant_indicators: [
           			{
           				"Enabling conditions - all stages": "Knowledge integration, e.g., across academic disciplines, local, Indigenous, practitioner domains\n              Recognition and support of existing governance by Indigenous peoples and local rightsholders, including sovereignty, self-determination, and rights of access, use, and management\n              Social design principles: Recognition of pre-existing rights, tenure, and human extractive and nonextractive uses"
           			}
           		]
           	},
           	{
           		result_id: 2,
           		result_name: "Transparent, accountable & functional decision making",
           		result_key_questions:
                  [
                  	"Is key info about the PA/OECM available to relevant stakeholders/rightsholders?",
                  	"Are details of membership of governing body public and rules for becoming a member clear?",
                  	"Are there clear decision making processes regarding governance issues?"
                  ],

           		result_relevant_indicators: [
           			{ "7a": "Question statement" },
           			{ 26: "Question statement" }
           		]

           	}
           ]
  	}
  ]
}
