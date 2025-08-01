from flask import Blueprint, request, jsonify
import uuid
from datetime import datetime

artifacts_bp = Blueprint('artifacts', __name__)

# In-memory storage for artifacts
artifacts = [
    {
        'id': '1',
        'title': 'API Authentication Guide',
        'content': 'Complete guide for API authentication implementation',
        'type': 'documentation',
        'author': 'Sarah Chen',
        'tags': ['security', 'api', 'auth'],
        'created_at': '2024-07-28T10:00:00Z',
        'views': 145,
        'status': 'published'
    },
    {
        'id': '2',
        'title': 'Database Migration Scripts',
        'content': 'Scripts for database schema migrations',
        'type': 'code',
        'author': 'Mike Johnson',
        'tags': ['database', 'migration'],
        'created_at': '2024-07-25T15:30:00Z',
        'views': 98,
        'status': 'published'
    }
]

@artifacts_bp.route('/artifacts', methods=['POST'])
def add_artifact():
    """Add new artifact"""
    try:
        data = request.json
        required = ["title", "content", "type", "author"]
        
        if not all(data.get(k) for k in required):
            return jsonify({"error": "Missing required fields"}), 400
        
        artifact = {
            'id': str(uuid.uuid4()),
            'title': data['title'],
            'content': data['content'],
            'type': data['type'],
            'author': data['author'],
            'tags': data.get('tags', []),
            'created_at': datetime.now().isoformat(),
            'views': 0,
            'status': 'published'
        }
        
        artifacts.append(artifact)
        return jsonify({"message": "Artifact added successfully!", "artifact": artifact})
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@artifacts_bp.route('/artifacts', methods=['GET'])
def get_artifacts():
    """Get all artifacts with optional filtering"""
    try:
        artifact_type = request.args.get("type")
        tag = request.args.get("tag")
        author = request.args.get("author")
        
        results = artifacts
        
        if artifact_type:
            results = [a for a in results if a.get("type") == artifact_type]
        
        if tag:
            results = [a for a in results if tag in a.get("tags", [])]
        
        if author:
            results = [a for a in results if a.get("author") == author]
        
        return jsonify(results)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@artifacts_bp.route('/artifacts/search', methods=['GET'])
def search_artifacts():
    """Search artifacts by keyword"""
    try:
        query = request.args.get("q", "").lower()
        
        if not query:
            return jsonify(artifacts)
        
        filtered = [
            a for a in artifacts
            if query in a.get("title", "").lower()
            or query in a.get("content", "").lower()
            or any(query in tag.lower() for tag in a.get("tags", []))
        ]
        
        return jsonify(filtered)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@artifacts_bp.route('/artifacts/<artifact_id>', methods=['DELETE'])
def delete_artifact(artifact_id):
    """Delete artifact by ID"""
    try:
        global artifacts
        artifacts = [a for a in artifacts if a.get("id") != artifact_id]
        return jsonify({"message": f"Artifact {artifact_id} deleted successfully"})
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@artifacts_bp.route('/artifacts/<artifact_id>/view', methods=['POST'])
def increment_views(artifact_id):
    """Increment view count for artifact"""
    try:
        for artifact in artifacts:
            if artifact['id'] == artifact_id:
                artifact['views'] = artifact.get('views', 0) + 1
                return jsonify({"message": "View count updated", "views": artifact['views']})
        
        return jsonify({"error": "Artifact not found"}), 404
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
