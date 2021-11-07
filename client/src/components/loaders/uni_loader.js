export default function UniLoader(props) {
    return (
      <div class="d-flex space-between">
        <strong>{`${props.children} `}</strong>
        <div
          class="spinner-border ml-auto"
          role="status"
          aria-hidden="true"
        ></div>
      </div>
    );
  }
  