import re
import sys
import os

def convert_attribute(attribute):
    parts = attribute.split('-')
    return parts[0] + ''.join(part.capitalize() for part in parts[1:])

def convert_svg_to_react(svg_content):
    attributes_to_convert = re.findall(r'(\w+-\w+=)', svg_content)
    for attribute in set(attributes_to_convert):
        react_attribute = convert_attribute(attribute)
        svg_content = svg_content.replace(attribute, react_attribute)
    return svg_content

def create_react_component(svg_content, component_name):
    return f"""
const {component_name}: React.FC = () => (
  {svg_content}
);

export default {component_name};
"""

def main():
    if len(sys.argv) < 2:
        print("Please provide the SVG file name as an argument.")
        return

    svg_file_name = sys.argv[1]
    svg_full_dir = f"svg_temp/{svg_file_name}.svg"
    component_name = svg_file_name
    component_full_dir = f'components/svg/{component_name}.tsx'

    with open(svg_full_dir, 'r') as file:
        svg_content = file.read()

    react_svg_content = convert_svg_to_react(svg_content)
    react_component = create_react_component(react_svg_content, component_name)

    with open(component_full_dir, 'w') as file:
        file.write(react_component)

    try:
        os.remove(svg_full_dir)
    except OSError as e:
        print(f"Error: {e.filename} - {e.strerror}")

    print(f'{component_name}.tsx has been created successfully!')

if __name__ == "__main__":
    main()
